import MainButton from '@/components/web/mainButton/mainButton'
import firstSnake from '@/assets/images/firstSnake.png'
import { Header } from '@/components/web/header/Header'
import instagramIcon from '@/assets/icons/instagram_solidWhite.svg'
import telegramIcon from '@/assets/icons/telegramWhite.svg'
import linkedInIcon from '@/assets/icons/linkedIn.svg'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  { href: 'https://instagram.com', icon: instagramIcon, alt: 'Instagram' },
  { href: 'https://t.me', icon: telegramIcon, alt: 'Telegram' },
  { href: 'https://linkedin.com', icon: linkedInIcon, alt: 'LinkedIn' },
]

export function FirstSection() {
  const { t } = useTranslation()
  const carouselRaw = t('hero.carousel', { returnObjects: true })
  const carouselWords = Array.isArray(carouselRaw) ? carouselRaw : []
  return (
    <section className="relative w-full flex overflow-hidden bg-[#560080] md:bg-gradient-to-br md:from-[#ae5414] md:via-[#430960] md:to-[#120023] text-white px-4 md:px-8 xl:px-13">
      {/* Main Tabs Component Container */}
      <div className="relative lg:max-w-[1440px] font-halvar mx-auto w-full z-10 pt-[16px] lg:pt-[30px] lg:pb-[50px] h-full flex flex-col justify-between min-h-screen">
        <Header />

        {/* Hero Content */}
        <div className="flex flex-col items-start w-full max-w-[840px] font-halvar relative z-10 mt-[100px] lg:mt-[150px] h-full grow">
          {/* Headline */}
          <h1 className="text-[38px] xl:text-[80px] font-bold font-halvar tracking-[-0.83px] lg:tracking-[-1.74px] mb-3 text-white uppercase leading-[90%] w-full">
            {t('hero.headline.part1')}
            <br />
            {t('hero.headline.part2')}{' '}
            <span
              id="carouselAnimation"
              className="text-yellow-main w-max inline-block h-[34px] xl:h-[72px] overflow-hidden mb-[-4px] xl:mb-[-8px]"
            >
              <span className="flex flex-col justify-between">
                {carouselWords.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white font-stolzl text-base font-normal max-w-md mb-[20px] lg:mb-[30px] leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <MainButton className="p-6 xl:p-10 text-xl sm:text-2xl font-bold">
            {t('hero.cta')}
          </MainButton>
        </div>

        {/* Right: Snake Image */}
        <div className="inline-block pointer-events-none select-none absolute bottom-[-8vw] right-[-40px] lg:bottom-[-13vh] z-0">
          <img
            src={firstSnake}
            className="max-w-[unset] w-[110%] h-auto max-h-[600px] lg:w-auto lg:h-[100vh] lg:max-w-[calc(100%-600px)] lg:max-h-none object-contain"
            alt="Snake"
            draggable={false}
          />
        </div>

        {/* Social Links */}
        <ul className="hidden md:flex items-center gap-[30px]">
          {socialLinks.map(({ href, icon, alt }) => (
            <li key={alt}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex p-[5px]">
                <img src={icon} alt={alt} className="w-[30px] h-auto" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
