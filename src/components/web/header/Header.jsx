import snakeWhite from '@/assets/icons/snakeWhite.svg'
import { useTranslation } from 'react-i18next'

const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'benefits', href: '#benefits' },
  { key: 'join', href: '#join' },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.slice(0, 2)
  return (
    <header className="relative z-10 flex items-center justify-between mx-auto w-full gap-4">
      {/* Logo */}
      <img src={snakeWhite} alt="MULTICPA" className="h-[40px] lg:h-[41px] w-auto shrink-0" />

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-5 justify-end grow">
        {NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="text-yellow-main hover:text-white font-bold uppercase text-xl underline p-2.5 transition-colors duration-200"
          >
            {t(`nav.${link.key}`)}
          </a>
        ))}
      </nav>

      {/* Language Selector */}
      <div className="hidden md:flex items-center text-xl font-bold shrink-0">
        <button
          onClick={() => {
            i18n.changeLanguage('en')
            window.history.pushState({}, '', window.location.pathname.replace(/^\/ru/, '') || '/')
          }}
          className={`uppercase cursor-pointer transition-colors duration-200 ${
            currentLang === 'en' ? 'text-yellow-main' : 'text-white'
          }`}
        >
          ENG
        </button>
        <span className="text-yellow-main">/</span>
        <button
          onClick={() => {
            i18n.changeLanguage('ru')
            if (!window.location.pathname.startsWith('/ru')) {
              window.history.pushState({}, '', '/ru' + window.location.pathname)
            }
          }}
          className={`uppercase cursor-pointer transition-colors duration-200 ${
            currentLang === 'ru' ? 'text-yellow-main' : 'text-white'
          }`}
        >
          РУС
        </button>
      </div>
    </header>
  )
}
