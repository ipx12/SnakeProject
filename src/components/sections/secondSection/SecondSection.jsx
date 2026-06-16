import secondSnake from '@images/secondSnake.png'
import secondSnakeMb from '@images/secondSnake-mobile.png'

import {
  useState,
  useEffect,
} from 'react'

export function SecondSection() {
  const [isDesktop, setIsDesktop] =
    useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(
        window.innerWidth >= 1200,
      )
    }

    handleResize()

    window.addEventListener(
      'resize',
      handleResize,
    )

    return () =>
      window.removeEventListener(
        'resize',
        handleResize,
      )
  }, [])
  return (
    <section id='2' className="second">
      <div className="mx-auto h-screen max-w-[1920px] px-4 min-[700px]:px-12 xl:max-w-[1440px]">
        <div
          className=" pt-20 pb-5 xl:flex xl:flex-col-reverse lg:gap-[30px] xl:pt-10 min-[1400px]:h-full min-[1400px]:justify-end xl:gap-[50px]
      "
        >
          <div
            className="
          mx-auto flex max-h-[81vh] max-w-[500px]
          flex-col gap-5 overflow-y-auto
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          xl:max-w-full xl:flex-row
        "
          >
            <div
              className="
            flex flex-col items-start gap-2.5 rounded-[8px]
            bg-[linear-gradient(274deg,#9500dc_0%,#560080_55.77%,#220032_100%)]
            p-0
            xl:max-w-[560px]
          "
            >
              <h3
                className="
              px-[10px] pt-[10px]
              font-['Stolzl']
              text-[20px] leading-[120%]
              text-white 

              xl:px-[38px] xl:pt-[30px]
            "
              >
                We run an{' '}
                <span className="text-yellow-400">
                  in-house team
                </span>{' '}
                of media buyers,
                designers, creatives,
                developers, and
                copywriters — no
                middlemen, no
                outsourcing
              </h3>

              <img
                src={
                  isDesktop
                    ? secondSnake
                    : secondSnakeMb
                }
                alt="Фиолетовая змея с бриллиантом"
                className="
              mt-6 w-full object-contain

              xl:mx-auto xl:mt-0 xl:max-w-[80%]

              min-[1400px]:max-w-[558px]
            "
              />
            </div>

            <div className="flex flex-col gap-5">
              <div
                className="
              flex flex-grow flex-col items-start gap-2.5
              rounded-[8px] bg-[#9e13e0] p-[10px]
            "
              >
                <h3
                  className="
                font-['Halvar_Breit']
                text-[28px]
                font-bold
                uppercase
                leading-none
                text-yellow-400
              "
                >
                  Flexible
                  infrastructure
                </h3>

                <p
                  className="
                font-['Stolzl']
                text-[20px]
                leading-[120%]
                text-white opacity-90 xl:opacity-70
              "
                >
                  Custom tools, fast
                  integrations and
                  scalable architecture
                </p>
              </div>

              <div
                className="
              flex flex-grow flex-col items-start gap-2.5
              rounded-[8px] bg-[#9e13e0] p-[10px]
            "
              >
                <h3
                  className="
                font-['Halvar_Breit']
                text-[28px]
                font-bold
                uppercase
                leading-none
                text-yellow-400
              "
                >
                  High-performing
                  creatives
                </h3>

                <p
                  className="
                font-['Stolzl']
                text-[20px]
                leading-[120%]
                text-white opacity-90 xl:opacity-70
              "
                >
                  Scroll-stopping ads
                  tailored to your
                  vertical
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div
                className="
              flex flex-grow flex-col items-start gap-2.5
              rounded-[8px] bg-[#9e13e0] p-[10px]
            "
              >
                <h3
                  className="
                font-['Halvar_Breit']
                text-[28px]
                font-bold
                uppercase
                leading-none
                text-yellow-400
              "
                >
                  Compelling copywriting
                </h3>

                <p
                  className="
                font-['Stolzl']
                text-[20px]
                leading-[120%]
                text-white opacity-90 xl:opacity-70
              "
                >
                  Messaging that hooks,
                  sells, and drives
                  funnel growth
                </p>
              </div>

              <div
                className="
              flex flex-grow flex-col items-start gap-2.5
              rounded-[8px] bg-[#9e13e0] p-[10px]
            "
              >
                <h3
                  className="
                font-['Halvar_Breit']
                text-[28px]
                font-bold
                uppercase
                leading-none
                text-yellow-400
              "
                >
                  Adaptive media buying
                </h3>

                <p
                  className="
                font-['Stolzl']
                text-[20px]
                leading-[120%]
                text-white opacity-90 xl:opacity-70
              "
                >
                  No wasted budgets — we
                  test, tweak, and scale
                </p>
              </div>

              <div
                className="
              flex flex-grow flex-col items-start gap-2.5
              rounded-[8px] bg-[#9e13e0] p-[12px]
            "
              >
                <h3
                  className="
                font-['Halvar_Breit']
                text-[28px]
                font-bold
                uppercase
                leading-none
                text-yellow-400
              "
                >
                  Full-cycle support
                </h3>

                <p
                  className="
                font-['Stolzl']
                text-[20px]
                leading-[120%]
                text-white opacity-90 xl:opacity-70
              "
                >
                  From setup to scaling
                  — we support you every
                  step of the way
                </p>
              </div>
            </div>
          </div>

          <h2
            className="
          fixed bottom-5 left-0 right-0 z-10
          text-center
          font-['Halvar_Breit']
          text-[20px]
          font-bold
          uppercase
          leading-[90%]
          text-yellow-400

          xl:static
          xl:self-end
          xl:text-[30px]

          min-[1400px]:text-[40px]
        "
          >
            MULTI-TASKS
          </h2>
        </div>
      </div>
    </section>
  )
}
export default SecondSection
