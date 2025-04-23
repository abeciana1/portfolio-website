import { type JobProps } from '@/types/blockTypes'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';
import { ScrollArea } from '@/components/_core/ScrollArea'
import { format } from 'date-fns'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import { ChevronUp } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/motion-primitives/accordion'
import Pill from '@/components/_styled/Pill'
import Link from 'next/link'

const Job: React.FC<JobProps> = ({
  companyName,
  jobRole,
  companyDescription,
  companyWebsite,
  companyLogo,
  startDate,
  endDate,
  location,
  positionType,
  currentPosition,
  skills,
  duties
}) => {
  const { image } = companyLogo[0]
  const { webpUrl } = image
  return (
    <MorphingDialog
      testId='job'
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger
        className='relative w-full max-w-2xl mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg p-4 md:h-20 bg-background'
      >
        <div className='flex space-x-6 items-center'>
          <MorphingDialogImage
            src={webpUrl}
            alt={`Company logo - ${companyName}`}
            className='h-auto w-auto max-h-20 max-w-20 min-w-[80px] object-cover object-top'
          />
          <div className='flex flex-col w-full'>
            <div
              className='flex flex-col sm:flex-row justify-between text-foreground font-medium text-md'
            >
              <MorphingDialogTitle>
                <div className='flex flex-col sm:flex-row sm:gap-2 text-left'>
                  <span data-testid='job-role'>{jobRole}</span>
                  <span className='font-bold hidden sm:block'>·</span>
                  <span data-testid='position'>{positionType}</span>
                </div>
              </MorphingDialogTitle>
              <div className='flex justify-start'>
                <span>{`${format(new Date(startDate), 'MMM yyyy')} — ${currentPosition ? 'Present' : format(new Date(endDate as string), 'MMM yyyy')}`}</span>
              </div>
            </div>
            <MorphingDialogSubtitle
              className='flex justify-between text-darkGrey text-md'
            >
              <div className='flex flex-col sm:flex-row justify-between w-full sm:gap-2 text-left'>
                <span
                  data-testid='company-name'
                  
                >
                  {companyName}
                </span>
                <span>{location}</span>
              </div>
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className='relative h-auto w-[500px] border-2 border-darkGrey dark:border-pillGrey bg-background rounded-lg'
        >
          <ScrollArea className='h-[90vh]' type='scroll'>
            <div className='relative p-6 space-y-6'>
              <div className='flex justify-center'>
                <MorphingDialogImage
                  src={webpUrl}
                  alt={`Company logo - ${companyName}`}
                  className='h-auto w-auto max-h-16 object-cover object-top'
                />
              </div>
              <div>
                <div className='flex justify-between text-foreground dark:text-background font-medium text-md'>
                  <MorphingDialogTitle>
                    <div className='flex flex-col sm:flex-row sm:gap-2 text-left'>
                      <span data-testid='job-role'>{jobRole}</span>
                      <span className='font-bold hidden sm:block'>·</span>
                      <span data-testid='position'>{positionType}</span>
                    </div>
                  </MorphingDialogTitle>
                  <div className='flex justify-start'>
                    <span>{`${format(new Date(startDate), 'MMM yyyy')} — ${currentPosition ? 'Present' : format(new Date(endDate as string), 'MMM yyyy')}`}</span>
                  </div>
                </div>
                <MorphingDialogSubtitle
                  className='flex justify-between text-darkGrey dark:text-pillGrey text-md'
                >
                  <div className='flex flex-row justify-between w-full sm:gap-2 text-left'>
                    <span
                      data-testid='company-name'
                    >
                      {companyName}
                    </span>
                    <span>{location}</span>
                  </div>
                </MorphingDialogSubtitle>
              </div>
              <div className='space-y-3'>
                <div className='flex gap-2 items-center'>
                  <div className='text-xl text-foreground'>Company description</div>
                  <span className='font-bold'>·</span>
                  <Link
                    href={companyWebsite}
                    target='_blank'
                    className='text-xl text-blue-500'
                  >
                    Website
                  </Link>
                </div>
                <div>
                  <div>{companyDescription}</div>
                </div>
              </div>
              {(skills && skills?.length > 0) &&
                <Accordion
                  className='flex w-full flex-col'
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <AccordionItem value="skills" className='space-y-3'>
                    <AccordionTrigger className='w-full text-left text-foreground'>
                      <div className='flex items-center justify-between'>
                        <div className='text-xl'>Technologies used</div>
                        <ChevronUp className='h-6 w-6 text-foreground transition-transform duration-200 group-data-expanded:-rotate-180 ' />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-wrap gap-3'>
                      {skills?.map((skill) => {
                        return (
                          <Pill
                            key={`${skill.title}-${skill.id}`}
                            text={skill.title}
                          />
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              }
              <div className='space-y-3'>
                <div className='text-xl text-foreground dark:text-background'>Responsibilities</div>
                <div className='px-3'>
                  <RichTextEditor content_html={duties[0].content_html} />
                </div>
              </div>
            </div>
          </ScrollArea>
          <MorphingDialogClose className='text-foreground' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default Job