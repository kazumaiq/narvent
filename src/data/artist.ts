export interface Achievement {
  title: string;
  value: string;
  label: string;
  detail: string;
}

export const artist = {
  name: 'NARVENT',
  realName: 'Фарход Мусульмонов',
  genres: ['Вейв-фонк', 'Атмосферный синтвейв', 'Дрифт-вейв', 'Ноктюрнальная электроника', 'Космический фонк'],
  origin: 'Самарканд',
  birthDate: '19 июля 2005 г.',
  label: 'volume100 / Believe Digital',
  spotifyId: '3QZtwiUoyaXbl1JssMPIQ7',
  appleMusicId: '1489292108',
  youtubeChannel: '@NarventMusic',
  bio: `Фарход Мусульмонов (Narvent) — продюсер и автор мирового хита «Memory Reboot» (310M+ стримов, Золото RIAA, #13 Billboard Hot Dance).

Первопроходец ноктюрнального вейв-фонка и кинематографичного синтвейва: глубокие саб-басы, синты 80-х и звук ночных автострад. Его концептуальные альбомы «Insomnia» и «Genesis» объединили миллионы слушателей по всему миру.`,
  shortBio: 'Архитектор ноктюрнального вейв-фонка и кинематографичного космического синтвейва.',
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
      detail: '13-я строчка главного чарта танцевальной музыки США',
    },
    {
      title: 'Стримы Spotify',
      value: '310M+',
      label: 'Стримы одного трека',
      detail: 'Более 310 миллионов прослушиваний «Memory Reboot»',
    },
    {
      title: 'YouTube',
      value: '650M+',
      label: 'Просмотры клипов',
      detail: 'Суммарные просмотры официальных видео и визуалайзеров',
    },
    {
      title: 'Аудитория',
      value: '3.2M+',
      label: 'Слушателей / месяц',
      detail: 'Подтверждённая аудитория на мировых стримингах',
    },
    {
      title: 'Дискография',
      value: '31',
      label: 'Релиз в каталоге',
      detail: '5 студийных альбомов, концептуальные EP и синглы',
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
