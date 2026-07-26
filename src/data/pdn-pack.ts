export type PdnDoc = { id: string; category: string; title: string; href: string };

export const pdnPackCategories = [
  "Приказы",
  "Положения и правила",
  "Акты",
  "Инструкции",
  "Журналы",
  "Согласия",
  "Формы запросов",
] as const;

export const pdnPackDocuments: PdnDoc[] = 
[
  {
    "id": "order-01-responsible",
    "category": "Приказы",
    "title": "Приказ о назначении ответственного за организацию обработки персональных данных",
    "href": "/docs/pdn/order-01-responsible.html"
  },
  {
    "id": "order-02-security",
    "category": "Приказы",
    "title": "Приказ о мерах по обеспечению безопасности персональных данных",
    "href": "/docs/pdn/order-02-security.html"
  },
  {
    "id": "order-03-regulation",
    "category": "Приказы",
    "title": "Приказ об утверждении Положения об обработке персональных данных",
    "href": "/docs/pdn/order-03-regulation.html"
  },
  {
    "id": "order-04-pd-list",
    "category": "Приказы",
    "title": "Приказ об утверждении перечня обрабатываемых персональных данных",
    "href": "/docs/pdn/order-04-pd-list.html"
  },
  {
    "id": "order-05-ispdn-list",
    "category": "Приказы",
    "title": "Приказ об утверждении перечня информационных систем персональных данных (ИСПДн)",
    "href": "/docs/pdn/order-05-ispdn-list.html"
  },
  {
    "id": "order-06-access",
    "category": "Приказы",
    "title": "Приказ о допуске работников к обработке персональных данных",
    "href": "/docs/pdn/order-06-access.html"
  },
  {
    "id": "order-07-territory",
    "category": "Приказы",
    "title": "Приказ об определении контролируемой территории",
    "href": "/docs/pdn/order-07-territory.html"
  },
  {
    "id": "order-08-paper",
    "category": "Приказы",
    "title": "Приказ о хранении бумажных носителей персональных данных",
    "href": "/docs/pdn/order-08-paper.html"
  },
  {
    "id": "reg-processing",
    "category": "Положения и правила",
    "title": "Положение об обработке персональных данных",
    "href": "/docs/pdn/reg-processing.html"
  },
  {
    "id": "reg-internal-control",
    "category": "Положения и правила",
    "title": "Правила внутреннего контроля соответствия обработки персональных данных",
    "href": "/docs/pdn/reg-internal-control.html"
  },
  {
    "id": "reg-subject-requests",
    "category": "Положения и правила",
    "title": "Правила рассмотрения запросов субъектов персональных данных",
    "href": "/docs/pdn/reg-subject-requests.html"
  },
  {
    "id": "act-harm",
    "category": "Акты",
    "title": "Акт оценки потенциального вреда субъектам персональных данных",
    "href": "/docs/pdn/act-harm.html"
  },
  {
    "id": "act-uz4",
    "category": "Акты",
    "title": "Акт определения уровня защищённости персональных данных (УЗ-4)",
    "href": "/docs/pdn/act-uz4.html"
  },
  {
    "id": "act-destroy-is",
    "category": "Акты",
    "title": "Акт об уничтожении персональных данных в информационной системе (шаблон)",
    "href": "/docs/pdn/act-destroy-is.html"
  },
  {
    "id": "act-destroy-paper",
    "category": "Акты",
    "title": "Акт об уничтожении бумажных носителей персональных данных (шаблон)",
    "href": "/docs/pdn/act-destroy-paper.html"
  },
  {
    "id": "instr-user",
    "category": "Инструкции",
    "title": "Инструкция пользователя ИСПДн",
    "href": "/docs/pdn/instr-user.html"
  },
  {
    "id": "instr-antivirus",
    "category": "Инструкции",
    "title": "Инструкция по антивирусной защите",
    "href": "/docs/pdn/instr-antivirus.html"
  },
  {
    "id": "instr-backup",
    "category": "Инструкции",
    "title": "Инструкция по резервному копированию",
    "href": "/docs/pdn/instr-backup.html"
  },
  {
    "id": "instr-responsible",
    "category": "Инструкции",
    "title": "Инструкция ответственного за организацию обработки персональных данных",
    "href": "/docs/pdn/instr-responsible.html"
  },
  {
    "id": "instr-incident",
    "category": "Инструкции",
    "title": "Инструкция по действиям при нештатной ситуации (утечка / инцидент ИБ)",
    "href": "/docs/pdn/instr-incident.html"
  },
  {
    "id": "instr-access",
    "category": "Инструкции",
    "title": "Инструкция по управлению правами доступа к ИСПДн",
    "href": "/docs/pdn/instr-access.html"
  },
  {
    "id": "instr-password",
    "category": "Инструкции",
    "title": "Инструкция по парольной защите",
    "href": "/docs/pdn/instr-password.html"
  },
  {
    "id": "instr-crypto",
    "category": "Инструкции",
    "title": "Инструкция по использованию средств криптографической защиты (при применении)",
    "href": "/docs/pdn/instr-crypto.html"
  },
  {
    "id": "instr-paper",
    "category": "Инструкции",
    "title": "Инструкция по работе с бумажными носителями ПДн",
    "href": "/docs/pdn/instr-paper.html"
  },
  {
    "id": "instr-optional-list",
    "category": "Инструкции",
    "title": "Перечень опциональных инструкций (рекомендуется при расширении ИТ)",
    "href": "/docs/pdn/instr-optional-list.html"
  },
  {
    "id": "log-briefing",
    "category": "Журналы",
    "title": "Журнал учёта прохождения инструктажа по обработке персональных данных",
    "href": "/docs/pdn/log-briefing.html"
  },
  {
    "id": "log-checks",
    "category": "Журналы",
    "title": "Журнал учёта проверок контролирующими органами",
    "href": "/docs/pdn/log-checks.html"
  },
  {
    "id": "log-access",
    "category": "Журналы",
    "title": "Журнал учёта прав доступа к ИСПДн",
    "href": "/docs/pdn/log-access.html"
  },
  {
    "id": "log-carriers",
    "category": "Журналы",
    "title": "Журнал учёта носителей персональных данных",
    "href": "/docs/pdn/log-carriers.html"
  },
  {
    "id": "log-incidents",
    "category": "Журналы",
    "title": "Журнал учёта инцидентов информационной безопасности / утечек",
    "href": "/docs/pdn/log-incidents.html"
  },
  {
    "id": "log-requests",
    "category": "Журналы",
    "title": "Журнал учёта обращений субъектов персональных данных",
    "href": "/docs/pdn/log-requests.html"
  },
  {
    "id": "log-destructions",
    "category": "Журналы",
    "title": "Журнал учёта уничтожения персональных данных",
    "href": "/docs/pdn/log-destructions.html"
  },
  {
    "id": "consent-client",
    "category": "Согласия",
    "title": "Согласие клиента (субъекта) на обработку персональных данных",
    "href": "/docs/pdn/consent-client.html"
  },
  {
    "id": "consent-employee",
    "category": "Согласия",
    "title": "Согласие работника на обработку персональных данных",
    "href": "/docs/pdn/consent-employee.html"
  },
  {
    "id": "consent-candidate",
    "category": "Согласия",
    "title": "Согласие соискателя на обработку персональных данных",
    "href": "/docs/pdn/consent-candidate.html"
  },
  {
    "id": "consent-nda",
    "category": "Согласия",
    "title": "Обязательство о неразглашении персональных данных (NDA для допущенных лиц)",
    "href": "/docs/pdn/consent-nda.html"
  },
  {
    "id": "consent-publish",
    "category": "Согласия",
    "title": "Согласие на распространение персональных данных (ФИО / фото) — при публикации",
    "href": "/docs/pdn/consent-publish.html"
  },
  {
    "id": "form-presence",
    "category": "Формы запросов",
    "title": "Форма запроса о наличии персональных данных",
    "href": "/docs/pdn/form-presence.html"
  },
  {
    "id": "form-clarify",
    "category": "Формы запросов",
    "title": "Форма запроса на уточнение персональных данных",
    "href": "/docs/pdn/form-clarify.html"
  },
  {
    "id": "form-destroy",
    "category": "Формы запросов",
    "title": "Форма запроса на уничтожение персональных данных",
    "href": "/docs/pdn/form-destroy.html"
  },
  {
    "id": "form-block",
    "category": "Формы запросов",
    "title": "Форма запроса на блокирование персональных данных",
    "href": "/docs/pdn/form-block.html"
  },
  {
    "id": "form-withdraw",
    "category": "Формы запросов",
    "title": "Форма отзыва согласия на обработку персональных данных",
    "href": "/docs/pdn/form-withdraw.html"
  },
  {
    "id": "form-notice-fix",
    "category": "Формы запросов",
    "title": "Форма уведомления об устранении нарушений при обработке ПДн",
    "href": "/docs/pdn/form-notice-fix.html"
  },
  {
    "id": "form-notice-refuse",
    "category": "Формы запросов",
    "title": "Форма уведомления об отказе во внесении изменений / удовлетворении запроса",
    "href": "/docs/pdn/form-notice-refuse.html"
  }
];
