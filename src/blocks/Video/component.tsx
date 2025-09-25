'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Play,
  Pause,
  Volume1,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Maximize,
  Minimize,
  PictureInPicture2,
} from 'lucide-react'
import type { VideoBlockProps } from '@/types/blockTypes'
import Gradient from '@/components/_styled/Gradient'

const formatTime = (time: number): string => {
  if (!isFinite(time) || time < 0) return '00:00'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor(time % 60)
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`
}
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const VideoBlockPlayer: React.FC<VideoBlockProps> = ({
  video,
  forcedWidth,
  forcedHeight,
  gradient,
  gradientSelect = 'Variant1',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hideTimerRef = useRef<number | null>(null)

  const [showUi, setShowUi] = useState(true)
  const [hasReady, setHasReady] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)
  const [playing, setPlaying] = useState(false)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [seeking, setSeeking] = useState(false)

  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pipSupported, setPipSupported] = useState(false)
  const [bufferedEnd, setBufferedEnd] = useState(0)

  const pendingSeekRef = useRef<number | null>(null)

  const src = video?.streamUrl?.trim() || video?.videoUrl?.trim() || video?.url?.trim() || ''
  const poster = video?.thumbnailURL

  const getLiveDuration = (): number => {
    const v = videoRef.current
    if (!v) return duration
    let d = v.duration
    if (!Number.isFinite(d) || d <= 0 || d === Infinity) {
      const s = v.seekable
      if (s && s.length) {
        try {
          d = s.end(s.length - 1)
        } catch {}
      }
    }
    return Number.isFinite(d) && d > 0 ? (d as number) : duration
  }

  const getSeekWindow = (): { start: number; end: number } => {
    const v = videoRef.current
    if (!v) return { start: 0, end: duration }
    const s = v.seekable
    if (s && s.length) {
      try {
        const start = s.start(0)
        const end = s.end(s.length - 1)
        if (Number.isFinite(end) && end > start) return { start, end }
      } catch {}
    }
    const d = getLiveDuration()
    if (Number.isFinite(d) && d > 0) return { start: 0, end: d }
    return { start: 0, end: 0 }
  }

  const liveDuration = getLiveDuration()
  const percentPlayed = liveDuration > 0 ? (currentTime / liveDuration) * 100 : 0
  const percentBuffered = liveDuration > 0 ? (bufferedEnd / liveDuration) * 100 : 0
  const timeLabel = useMemo(
    () => `${formatTime(currentTime)} / ${formatTime(liveDuration)}`,
    [currentTime, liveDuration],
  )
  const showLoader = !hasReady || isBuffering

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const markReady = () => {
      if (!hasReady) setHasReady(true)
      const d = getLiveDuration()
      if (Number.isFinite(d) && d > 0) setDuration(d)
    }

    const onLoadedMetadata = () => {
      markReady()
      setIsBuffering(false)
      if (pendingSeekRef.current !== null) {
        const pct = pendingSeekRef.current
        pendingSeekRef.current = null
        seekToPercent(pct)
      }
    }
    const onLoadedData = () => {
      markReady()
      setIsBuffering(false)
    }
    const onCanPlay = () => {
      markReady()
      setIsBuffering(false)
    }
    const onCanPlayThrough = () => {
      markReady()
      setIsBuffering(false)
    }

    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => {
      setIsBuffering(false)
      setPlaying(true)
    }
    const onPause = () => setPlaying(false)
    const onStalled = () => setIsBuffering(true)
    const onProgress = () => {
      updateBuffered()
      if (pendingSeekRef.current !== null) {
        const { end } = getSeekWindow()
        if (end > 0) {
          const pct = pendingSeekRef.current
          pendingSeekRef.current = null
          seekToPercent(pct)
        }
      }
    }
    const onTimeUpdate = () => {
      if (!seeking) setCurrentTime(v.currentTime || 0)
      const d = getLiveDuration()
      if (Number.isFinite(d) && d > 0 && d !== duration) setDuration(d)
      if (!hasReady && (v.currentTime > 0 || (v.readyState ?? 0) >= 2)) setHasReady(true)
    }
    const onRateChange = () => setPlaybackRate(v.playbackRate)
    const onVolumeChange = () => {
      setVolume(v.volume)
      setMuted(v.muted)
    }
    const onError = () => {
      setIsBuffering(false)
      setHasReady(true)
    }

    v.addEventListener('loadedmetadata', onLoadedMetadata)
    v.addEventListener('loadeddata', onLoadedData)
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('canplaythrough', onCanPlayThrough)
    v.addEventListener('waiting', onWaiting)
    v.addEventListener('playing', onPlaying)
    v.addEventListener('pause', onPause)
    v.addEventListener('stalled', onStalled)
    v.addEventListener('progress', onProgress)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ratechange', onRateChange)
    v.addEventListener('volumechange', onVolumeChange)
    v.addEventListener('error', onError)

    v.volume = volume
    v.muted = muted
    v.playbackRate = playbackRate

    return () => {
      v.removeEventListener('loadedmetadata', onLoadedMetadata)
      v.removeEventListener('loadeddata', onLoadedData)
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('canplaythrough', onCanPlayThrough)
      v.removeEventListener('waiting', onWaiting)
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('stalled', onStalled)
      v.removeEventListener('progress', onProgress)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ratechange', onRateChange)
      v.removeEventListener('volumechange', onVolumeChange)
      v.removeEventListener('error', onError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeking, hasReady, duration, volume, muted, playbackRate])

  useEffect(() => {
    const onFsChange = () => {
      const fsElem = document.fullscreenElement || (document as any).webkitFullscreenElement
      setIsFullscreen(!!fsElem)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
    }
  }, [])
  useEffect(() => {
    setPipSupported('pictureInPictureEnabled' in document)
  }, [])

  const kickUi = () => {
    setShowUi(true)
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => setShowUi(false), 2000)
  }
  const hideUiNow = () => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = null
    setShowUi(false)
  }
  useEffect(
    () => () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    },
    [],
  )

  const updateBuffered = () => {
    const v = videoRef.current
    if (!v) return
    try {
      const ranges = v.buffered
      if (ranges.length) setBufferedEnd(ranges.end(ranges.length - 1))
    } catch {}
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }
  const skip = (sec: number) => {
    const v = videoRef.current
    if (!v) return
    const { start, end } = getSeekWindow()
    const max = end || v.duration || 0
    v.currentTime = clamp(v.currentTime + sec, start, max)
    setCurrentTime(v.currentTime)
  }

  const setVol = (pct: number) => {
    const v = videoRef.current
    if (!v) return
    const vol = clamp(pct, 0, 100) / 100
    v.volume = vol
    v.muted = vol === 0
  }
  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
  }
  const changeRate = (rate: number) => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = clamp(rate, 0.25, 4)
    setPlaybackRate(v.playbackRate)
  }
  const toggleFullscreen = async () => {
    const root = containerRef.current
    const vid = videoRef.current as any
    if (!root) return
    if (!document.fullscreenElement && vid?.webkitEnterFullscreen) {
      try {
        vid.webkitEnterFullscreen()
        return
      } catch {}
    }
    if (!document.fullscreenElement) await root.requestFullscreen?.()
    else await document.exitFullscreen?.()
  }
  const togglePiP = async () => {
    const v = videoRef.current as any
    if (!v) return
    if ('webkitSetPresentationMode' in v) {
      const mode = v.webkitPresentationMode
      v.webkitSetPresentationMode(mode === 'picture-in-picture' ? 'inline' : 'picture-in-picture')
      return
    }
    if ((document as any).pictureInPictureElement) await (document as any).exitPictureInPicture()
    else if (document.pictureInPictureEnabled && !v.disablePictureInPicture)
      await v.requestPictureInPicture()
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const prevent = () => {
      e.preventDefault()
      kickUi()
    }
    switch (e.key) {
      case ' ':
      case 'k':
        prevent()
        togglePlay()
        break
      case 'm':
        prevent()
        toggleMute()
        break
      case 'ArrowRight':
        prevent()
        skip(5)
        break
      case 'ArrowLeft':
        prevent()
        skip(-5)
        break
      case 'ArrowUp':
        prevent()
        setVol(volume * 100 + 5)
        break
      case 'ArrowDown':
        prevent()
        setVol(volume * 100 - 5)
        break
      case 'f':
        prevent()
        toggleFullscreen()
        break
      case '>':
      case '.':
        prevent()
        changeRate(playbackRate + 0.25)
        break
      case '<':
      case ',':
        prevent()
        changeRate(playbackRate - 0.25)
        break
      default:
        break
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (v) v.muted = muted
  }, [muted])
  useEffect(() => {
    const v = videoRef.current
    if (v) v.volume = volume
  }, [volume])

  const aspect = forcedWidth && forcedHeight ? `${forcedWidth} / ${forcedHeight}` : '16 / 9'
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: forcedWidth ? `${forcedWidth}px` : undefined,
    aspectRatio: aspect,
    cursor: isFullscreen ? 'auto' : showUi ? 'auto' : 'none',
  }

  const seekToPercent = (pct: number) => {
    const v = videoRef.current
    if (!v) return
    const { start, end } = getSeekWindow()
    if (!(end > start)) {
      pendingSeekRef.current = clamp(pct, 0, 100)
      return
    }
    const clampedPct = clamp(pct, 0, 100)
    const t = start + (clampedPct / 100) * (end - start)
    v.currentTime = t
    setCurrentTime(t)
  }

  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)

  const pctFromClientX = (clientX: number) => {
    const el = progressBarRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    return clamp(pct, 0, 100)
  }

  const onProgressPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    draggingRef.current = true
    setSeeking(true)
    seekToPercent(pctFromClientX(e.clientX))
  }
  const onProgressPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return
    seekToPercent(pctFromClientX(e.clientX))
  }
  const onProgressPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    draggingRef.current = false
    setSeeking(false)
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  return (
    <div className="relative">
      <div
        className="absolute -top-10 left-20 w-full h-[90%]"
        style={{
          maxWidth: forcedWidth ? `${forcedWidth}px` : undefined,
          maxHeight: forcedHeight ? `${forcedHeight}px` : undefined,
        }}
      >
        <Gradient variant={gradientSelect} gradientXFlip gradientYFlip />
      </div>
      <div
        data-cursor="Watch"
        data-cursor-pointer="pointer"
        data-cursor-variant="image"
        data-cursor-allow-native={isFullscreen ? 'true' : undefined}
        ref={containerRef}
        className={`relative overflow-hidden rounded-lg bg-foreground mx-auto mb-6 ${showUi ? 'cursor-auto' : 'cursor-none'}`}
        style={containerStyle}
        tabIndex={0}
        onMouseMove={kickUi}
        onMouseLeave={hideUiNow}
        onKeyDown={onKeyDown}
        aria-label={video?.title || 'Video player'}
      >
        {(video?.title || gradient) && (
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-10 bg-foreground ${showUi ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          />
        )}
        {video?.title && (
          <div
            className={`absolute left-0 right-0 top-0 p-3 sm:p-4 text-white transition-opacity duration-200 ${showUi ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="text-sm sm:text-base font-medium drop-shadow">{video.title}</div>
          </div>
        )}

        <video
          ref={videoRef}
          className="h-full w-full bg-black object-contain"
          src={src}
          poster={poster}
          playsInline
          preload="auto"
          onClick={togglePlay}
          onDoubleClick={toggleFullscreen}
        />

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-foreground transition-opacity duration-200 ${showUi ? 'opacity-100' : 'opacity-0'}`}
        />

        <div
          className={`pointer-events-none absolute inset-0 grid place-items-center opacity-100`}
        >
          {!playing && hasReady && (
            <button
              onClick={togglePlay}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-5 py-3 backdrop-blur bg-background/60"
              aria-label="Play"
            >
              <Play className="h-7 w-7" />
              <span className="text-sm">Play</span>
            </button>
          )}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 px-3 sm:px-4 pb-3 pt-2 transition-opacity duration-200 ${showUi ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="mb-2 w-full">
            <div className="relative h-3 w-full">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-white/25"
                style={{ width: `${percentBuffered}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-white/60"
                style={{ width: `${percentPlayed}%` }}
              />
              <div
                ref={progressBarRef}
                onPointerDown={onProgressPointerDown}
                onPointerMove={onProgressPointerMove}
                onPointerUp={onProgressPointerUp}
                className="
                  absolute -inset-y-2 inset-x-0 h-7 z-30
                  cursor-pointer select-none touch-none
                "
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={isFinite(percentPlayed) ? Math.round(percentPlayed) : 0}
                aria-label="Seek"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={isFinite(percentPlayed) ? Math.round(percentPlayed) : 0}
                readOnly
                className="
                  absolute inset-0 w-full appearance-none bg-white/15 rounded-md h-3
                  pointer-events-none z-20
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                  [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
                "
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>

            <div className="mt-1 flex items-center justify-between text-xs text-white/90">
              <span>{timeLabel}</span>
              <span>{playbackRate.toFixed(2)}x</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => skip(-5)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Rewind 5s"
              >
                <Rewind className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                className="p-2 text-white hover:text-white"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button
                onClick={() => skip(10)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Forward 10s"
              >
                <FastForward className="h-5 w-5" />
              </button>

              {/* Volume */}
              <button
                onClick={() => (videoRef.current!.muted = !videoRef.current!.muted)}
                className="ml-1 p-2 text-white/80 hover:text-white"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : volume < 0.5 ? (
                  <Volume1 className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                onChange={(e) => setVol(Number(e.target.value))}
                className="
                  ml-1 w-[110px] h-2 cursor-pointer appearance-none rounded-md bg-white/25
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                  [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
                  hidden sm:block
                "
                aria-label="Volume"
              />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => changeRate(playbackRate - 0.25)}
                className="hidden sm:inline-flex p-2 text-white/80 hover:text-white"
                aria-label="Slower"
                title="Slower"
              >
                −0.25x
              </button>
              <button
                onClick={() => changeRate(playbackRate + 0.25)}
                className="hidden sm:inline-flex p-2 text-white/80 hover:text-white"
                aria-label="Faster"
                title="Faster"
              >
                +0.25x
              </button>

              {pipSupported && (
                <button
                  onClick={togglePiP}
                  className="hidden sm:inline-flex p-2 text-white/80 hover:text-white"
                  aria-label="Picture in Picture"
                  title="Picture in Picture"
                >
                  <PictureInPicture2 className="h-5 w-5" />
                </button>
              )}

              <button
                data-cursor="Watch"
                data-cursor-pointer="pointer"
                data-cursor-variant="image"
                onClick={toggleFullscreen}
                className="p-2 text-white/80 hover:text-white"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {showLoader && (
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="rounded-md bg-black/60 px-3 py-1 text-sm text-white/90">Loading…</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoBlockPlayer
