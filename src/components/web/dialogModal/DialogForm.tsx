import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { submitContactForm } from '@/api'
import snakeLogo from '@/assets/icons/pinkSnake.svg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@/components/ui/dialog'

const contactMethods = ['Telegram', 'Whatsapp', 'Email'] as const

const formSchema = z.object({
  name: z.string().optional(),
  method: z.enum(contactMethods, {
    message: 'Please select a contact method',
  }),
  contact: z.string().min(1, 'Contact details are required'),
})

type FormValues = z.infer<typeof formSchema>

export function DialogForm() {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      method: undefined,
      contact: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      // await submitContactForm({
      //   name: data.name || undefined,
      //   method: data.method.toLowerCase() as 'telegram' | 'whatsapp' | 'email',
      //   contact: data.contact,
      // })
      console.log(data)
      setIsSuccess(true)
      reset()
    } catch (error) {
      const err = error as Error
      console.error('Error submitting contact form:', err)
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center  text-center py-4 select-none">
        {/* Snake Logo Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <img src={snakeLogo} alt="Snake Logo" className="w-14 h-13" />
        </div>

        {/* Heading */}
        <h3 className="font-halvar font-bold text-xl sm:text-xl text-black leading-tight sm:leading-none tracking-wide text-center uppercase mb-3 sm:bm-5 max-w-[280px] sm:max-w-none">
          We have received your application!
        </h3>

        {/* Description */}
        <p className="text-balance font-halvar sm:max-w-sm text-base sm:text-xl text-center font-light sm:font-normal mb-15">
          We will process your request and get in touch with you
        </p>

        {/* Done Button */}
        <div className="flex justify-center pt-2">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="text-sm text-black bg-yellow-main py-5 px-10 font-halvar rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            >
              Done
            </Button>
          </DialogClose>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-2xl">
      {/* Snake Logo Header */}
      <div className="flex flex-col items-center justify-center mb-5">
        <img src={snakeLogo} alt="Snake Logo" className="w-14 h-13 mb-6" />
        <p className="font-sans text-center sm:w-full sm:text-left font-light text-sm sm:text-base leading-relaxed">
          Fields with an asterisk (
          <span className="text-[#a855f7] font-bold">*</span>) are mandatory
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Your Name"
                disabled={isSubmitting}
                className="h-auto w-full px-3 py-2.5 bg-white border border-[#e1c3ff] rounded-xl text-zinc-800 font-sans text-sm sm:text-base placeholder-zinc-500 focus:outline-none focus:border-[#a855f7] focus-visible:border-[#a855f7] focus-visible:ring-1 focus-visible:ring-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200"
              />
            )}
          />
          {!!errors.name && (
            <p className="text-red-500 text-xs mt-1 px-2 font-sans">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Method and Contact side-by-side row on desktop, stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Method Field (Shadcn Select) */}
          <div className="w-full sm:flex-[4.5]">
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full px-3 py-5 bg-white border border-[#e1c3ff] rounded-xl text-zinc-800 font-sans text-sm sm:text-base placeholder-zinc-400 focus:outline-none focus:border-[#a855f7] focus-visible:border-[#a855f7] focus-visible:ring-0 focus:ring-0 transition-all duration-200 cursor-pointer flex items-center justify-between pr-2.5 [&_svg]:hidden">
                    <SelectValue
                      placeholder={
                        <span className="text-zinc-500 font-sans text-sm sm:text-base flex items-center">
                          Contact Method
                          <span className="text-[#a855f7] ml-0.5">*</span>
                        </span>
                      }
                    />
                    <span className="text-[#a855f7] text-[10px] select-none pointer-events-none ml-1.5 mr-0.5">
                      ▼
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="bg-white border border-[#e1c3ff] rounded-xl shadow-md p-1"
                  >
                    {contactMethods.map((method) => (
                      <SelectItem
                        key={method}
                        value={method}
                        className="cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50 rounded-lg py-2 px-3 text-zinc-800 font-sans text-sm sm:text-base"
                      >
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {!!errors.method && (
              <p className="text-red-500 text-xs mt-1 px-2 font-sans">
                {errors.method.message}
              </p>
            )}
          </div>

          {/* Contact Field */}
          <div className="w-full sm:flex-[5.5]">
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <div className="relative w-full">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Your Contact"
                    disabled={isSubmitting}
                    className="h-auto w-full px-3 py-2.5 bg-white border border-[#e1c3ff] rounded-xl text-zinc-800 font-sans text-sm sm:text-base placeholder-zinc-500 focus:outline-none focus:border-[#a855f7] focus-visible:border-[#a855f7] focus-visible:ring-1 focus-visible:ring-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200"
                  />
                </div>
              )}
            />
            {!!errors.contact && (
              <p className="text-red-500 text-xs mt-1 px-2 font-sans">
                {errors.contact.message}
              </p>
            )}
          </div>
        </div>

        {!!submitError && (
          <p className="text-red-500 text-sm text-center px-2 font-sans">
            {submitError}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-sm text-black bg-yellow-main py-5 px-10 font-halvar rounded-xl"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DialogForm
