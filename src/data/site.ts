export const siteConfig = {
  name: 'Datagent',
  tagline: 'AI-платформа управления данными',
  description:
    'Объединяйте источники данных, оркестрируйте пайплайны и запускайте специализированных агентов — в одной среде для аналитиков, инженеров и продуктовых команд.',
  ctaPrimary: 'Запросить демо',
  ctaSecondary: 'Смотреть архитектуру',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@datagent.io',
} as const

export const metrics = [
  { value: '10×', label: 'быстрее подготовка датасетов' },
  { value: '99%', label: 'точность валидации полей' },
  { value: '50+', label: 'коннекторов к источникам' },
  { value: '24/7', label: 'мониторинг пайплайнов' },
] as const

export const features = [
  {
    title: 'Единый слой данных',
    description:
      'Подключайте БД, SaaS, файлы и API без миграций. Схемы и каталоги синхронизируются автоматически.',
    icon: 'database' as const,
  },
  {
    title: 'Агенты под задачу',
    description:
      'SQL, исследование, визуализация и RAG — каждый агент работает на ваших данных и показывает ход рассуждений.',
    icon: 'bot' as const,
  },
  {
    title: 'Пайплайны с контролем',
    description:
      'Оркестрация ETL/ELT, версионирование трансформаций и алерты при деградации качества.',
    icon: 'workflow' as const,
  },
  {
    title: 'Governance и доступ',
    description:
      'Роли, маскирование PII, аудит запросов и политики на уровне датасетов и агентов.',
    icon: 'shield' as const,
  },
] as const

export const architectureLayers = [
  {
    id: 'experience',
    title: 'Experience Layer',
    subtitle: 'Интерфейсы и API',
    items: ['Web UI', 'REST / GraphQL', 'Excel Add-in', 'Webhooks'],
  },
  {
    id: 'agents',
    title: 'Agent Orchestration',
    subtitle: 'Специализированные агенты',
    items: ['SQL Agent', 'Research Agent', 'Chart Agent', 'RAG Agent'],
  },
  {
    id: 'knowledge',
    title: 'Knowledge & Quality',
    subtitle: 'Слой знаний и доверия',
    items: ['Каталог данных', 'Валидация', 'Lineage', 'Semantic cache'],
  },
  {
    id: 'pipelines',
    title: 'Data Pipelines',
    subtitle: 'Инжиниринг данных',
    items: ['Ingestion', 'Transform', 'Orchestration', 'Observability'],
  },
  {
    id: 'connectors',
    title: 'Connectors',
    subtitle: 'Источники и приёмники',
    items: ['PostgreSQL', 'Snowflake', 'S3', 'SaaS CRM / ERP'],
  },
] as const

export const steps = [
  {
    step: '01',
    title: 'Подключите источники',
    text: 'Выберите коннекторы, задайте расписание синхронизации и политики доступа.',
  },
  {
    step: '02',
    title: 'Опишите домен',
    text: 'Каталогируйте сущности, метрики и бизнес-глоссарий — агенты опираются на этот контекст.',
  },
  {
    step: '03',
    title: 'Запустите агентов',
    text: 'Формулируйте задачи на естественном языке: отчёты, исследования, пайплайны.',
  },
  {
    step: '04',
    title: 'Масштабируйте',
    text: 'Публикуйте API, встраивайте в продукты и отслеживайте SLA пайплайнов.',
  },
] as const

export const navLinks = [
  { href: '#features', label: 'Возможности' },
  { href: '#architecture', label: 'Архитектура' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#contact', label: 'Контакты' },
] as const
