export interface Achievement {
  title: string;
  value: string;
  label: string;
  detail: string;
}

export const artist = {
  name: 'NARVENT',
  realName: 'Фарход Мусулмонов',
  genres: ['Кинематографичный синтвейв', 'Электронная музыка', 'Дарквейв', 'Ноктюрнальная эстетика'],
  birthDate: '19 июля 2005 г.',
  label: 'Believe Digital / Utopia',
  spotifyId: '3QZtwiUoyaXbl1JssMPIQ7',
  appleMusicId: '1489292108',
  youtubeChannel: '@NarventMusic',
  bio: `Фарход Мусулмонов (более известный как Narvent) — автор вирусных мировых хитов «Memory Reboot» и «Fainted».

Кинематографичный синтвейв и атмосферная электронная музыка: эстетика ночных дорог, бесконечной скорости и воспоминаний, растворяющихся в неоновом тумане. Концептуальные альбомы «Insomnia» и «Genesis» объединили миллионы слушателей по всему миру.`,
  shortBio: 'Кинематографичный синтвейв и эстетика ночных воспоминаний.',
  quote: '«Музыка ночных дорог, бесконечной скорости и воспоминаний, растворяющихся в неоновом тумане.»',
  achievements: [
    {
      title: 'Золото RIAA',
      value: 'GOLD',
      label: 'Сертификация RIAA',
      detail: 'Официальный золотой статус «Memory Reboot» в США',
    },
    {
      title: 'Billboard Dance',
      value: '#13',
      label: 'Billboard Hot Dance',
      detail: '13-я строчка главного чарта танцевальной и электронной музыки США',
    },
  ] as Achievement[],
  milestones: [
    {
      year: 2019,
      title: 'Дебют «Endless Way»',
      desc: 'Выход первого альбома, заложившего меланхоличную электронную основу звучания.',
    },
    {
      year: 2020,
      title: '«Forever In This World»',
      desc: 'Второй номерной альбом и яркие коллаборации, включая культовые треки с DVRST.',
    },
    {
      year: 2023,
      title: 'Мировой триумф «Memory Reboot»',
      desc: 'Исторический коллаб с VØJ: статус Золота RIAA в США и #13 в Billboard Hot Dance.',
    },
    {
      year: 2024,
      title: 'Концептуальный альбом «Insomnia»',
      desc: '13-трековый студийный магнум опус, хиты «Fainted», «Her Eyes» и коллаборации с Adieu Aru.',
    },
    {
      year: 2025,
      title: 'Развитие дарквейв-направления',
      desc: 'Синглы «Fade Into Darkness», «Way Back Home» и расширение звучания.',
    },
    {
      year: 2026,
      title: 'Новая эра «Genesis»',
      desc: 'Монументальный 17-трековый альбом «Genesis» и цикл космических EP «Recall» и «Ascend».',
    },
  ],
};
