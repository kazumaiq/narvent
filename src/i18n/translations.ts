export type Language = 'ru' | 'en';

export interface Translations {
  nav: {
    home: string;
    latest: string;
    popular: string;
    archive: string;
    about: string;
    socials: string;
    open3D: string;
    openMenu: string;
  };
  hero: {
    badge: string;
    subtitle: string;
    bio: string;
    latestReleaseTag: string;
    tracksCount: string;
    listen: string;
    cta3D: string;
    ctaPopular: string;
    ctaSpotify: string;
    riaaLabel: string;
    riaaSub: string;
    billboardLabel: string;
    billboardSub: string;
    telemetryFreq: string;
    telemetryLoc: string;
  };
  latest: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll3D: string;
    newReleaseBadge: string;
    album: string;
    ep: string;
    single: string;
    collab: string;
    tracksSuffix: string;
    officialMaster: string;
    yearSuffix: string;
    listenRelease: string;
    otherReleases: string;
    prev: string;
    next: string;
    featWith: string;
  };
  popular: {
    badge: string;
    title: string;
    subtitle: string;
    sortBadge: string;
    viralBadge: string;
    singleTag: string;
    listen: string;
    featWith: string;
    highlights: Record<string, string>;
  };
  archive: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterAlbums: string;
    filterEPs: string;
    filterSingles: string;
    filterCollabs: string;
    searchPlaceholder: string;
    view3D: string;
    viewGrid: string;
    spiralFullTitle: string;
    spiralMobileTitle: string;
    rotate: string;
    zoomIn: string;
    zoomOut: string;
    reset: string;
    listenSpotify: string;
    openDetails: string;
  };
  about: {
    badge: string;
    title: string;
    lead: string;
    bio: string;
    quote: string;
    quoteAuthor: string;
    dawTitle: string;
    dawValue: string;
    distroTitle: string;
    distroValue: string;
    riaaTitle: string;
    riaaValue: string;
    riaaLabel: string;
    riaaDetail: string;
    billboardTitle: string;
    billboardValue: string;
    billboardLabel: string;
    billboardDetail: string;
    timelineBadge: string;
    timelineTitle: string;
    milestones: Array<{
      year: number;
      title: string;
      desc: string;
    }>;
  };
  socials: {
    badge: string;
    title: string;
    subtitle: string;
  };
  audioBar: {
    soundOn: string;
    ambient: string;
    player: string;
    spotifyTitle: string;
    close: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
    copyright: string;
    distribution: string;
  };
  modal: {
    album: string;
    ep: string;
    single: string;
    released: string;
    tracklist: string;
    listenOn: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      home: 'ГЛАВНАЯ',
      latest: 'НОВЫЕ РЕЛИЗЫ',
      popular: 'ХИТЫ',
      archive: '3D АРХИВ',
      about: 'ОБ АРТИСТЕ',
      socials: 'СОЦСЕТИ',
      open3D: 'ОТКРЫТЬ 3D ДИСКОГРАФИЮ',
      openMenu: 'Открыть меню',
    },
    hero: {
      badge: 'ОФИЦИАЛЬНЫЙ САЙТ АРТИСТА',
      subtitle: 'Кинематографичный синтвейв и электронная музыка.',
      bio: 'Фарход Мусулмонов (более известный как Narvent) — автор вирусных мировых хитов «Memory Reboot» и «Fainted». Эстетика ночных дорог, бесконечной скорости и воспоминаний в неоновом тумане.',
      latestReleaseTag: 'НОВЫЙ РЕЛИЗ 2026',
      tracksCount: 'ТРЕКОВ',
      listen: 'СЛУШАТЬ',
      cta3D: '3D ДИСКОГРАФИЯ',
      ctaPopular: 'ТОП ТРЕКИ',
      ctaSpotify: 'SPOTIFY',
      riaaLabel: 'GOLD RIAA',
      riaaSub: 'Сертификация США',
      billboardLabel: '#13 BILLBOARD',
      billboardSub: 'Hot Dance / Elec',
      telemetryFreq: 'FREQ // 432.0 HZ',
      telemetryLoc: 'CORE // DEEP SPACE',
    },
    latest: {
      badge: 'СВЕЖИЕ РЕЛИЗЫ // 2025–2026',
      title: 'Новые релизы',
      subtitle: 'Последние музыкальные главы и концептуальные проекты, расширяющие атмосферную вселенную Narvent в мировых электронных плейлистах.',
      viewAll3D: 'СМОТРЕТЬ ВСЕ В 3D',
      newReleaseBadge: 'НОВЫЙ РЕЛИЗ',
      album: 'АЛЬБОМ',
      ep: 'МИНИ-АЛЬБОМ',
      single: 'СИНГЛ',
      collab: 'КОЛЛАБОРАЦИЯ',
      tracksSuffix: 'треков',
      officialMaster: 'Официальный мастер',
      yearSuffix: 'год',
      listenRelease: 'СЛУШАТЬ РЕЛИЗ',
      otherReleases: 'ДРУГИЕ НЕДАВНИЕ РЕЛИЗЫ',
      prev: 'Назад',
      next: 'Вперёд',
      featWith: 'совместно с',
    },
    popular: {
      badge: 'МИРОВЫЕ СИНГЛЫ // SPOTIFY',
      title: 'Главные синглы и хиты',
      subtitle: 'Определяющие синглы и сертифицированные мировые релизы, сформировавшие современное звучание атмосферного кинематографичного синтвейва.',
      sortBadge: '[ОФИЦИАЛЬНЫЕ СИНГЛЫ // SPOTIFY ВЕРИФИКАЦИЯ]',
      viralBadge: 'МИРОВОЙ ФЕНОМЕН',
      singleTag: 'СИНГЛ',
      listen: 'СЛУШАТЬ',
      featWith: 'совместно с',
      highlights: {
        'memory-reboot': 'Золотая сертификация RIAA (США) • Пик #13 Billboard Hot Dance',
        'fainted': 'Культовый мировой феномен ночной эстетики и вирусных автомобильных эдитов',
        'her-eyes': 'Мелодичный атмосферный синтвейв, ставший мировым трендом',
        'distant-echoes': 'Совместный релиз с продюсерами VXLLAIN и VØJ',
        'euphoria': 'Коллаборационный сингл с VØJ и KoruSe',
        'fade-into-darkness': 'Глубокий ночной атмосферный сингл в стилистике dark electronic',
      },
    },
    archive: {
      badge: 'SPOTIFY API // ВЕРИФИЦИРОВАННЫЙ 3D КАТАЛОГ',
      title: '3D Архив Spotify Дискографии',
      subtitle: 'Все официальные студийные альбомы, концептуальные мини-альбомы и синглы артиста, привязанные напрямую к Spotify API в трехмерном пространстве.',
      filterAll: 'ВСЕ',
      filterAlbums: 'АЛЬБОМЫ',
      filterEPs: 'EP',
      filterSingles: 'СИНГЛЫ',
      filterCollabs: 'КОЛЛАБЫ',
      searchPlaceholder: 'Поиск...',
      view3D: '3D',
      viewGrid: 'СЕТКА',
      spiralFullTitle: 'ХРОНО-СПИРАЛЬ // SPOTIFY API',
      spiralMobileTitle: 'СПИРАЛЬ // SPOTIFY API',
      rotate: 'ВРАЩЕНИЕ',
      zoomIn: 'Приблизить',
      zoomOut: 'Отдалить',
      reset: 'Сброс положения',
      listenSpotify: 'SPOTIFY',
      openDetails: 'ОТКРЫТЬ РЕЛИЗ',
    },
    about: {
      badge: 'ОБ АРТИСТЕ // ГЕНЕЗИС ЗВУКА',
      title: 'Архитектор ночного звучания',
      lead: 'Фарход Мусулмонов (Narvent) — автор мировых хитов «Memory Reboot» и «Fainted», создатель кинематографичного синтвейва.',
      bio: `Фарход Мусулмонов (более известный как Narvent) — автор вирусных мировых хитов «Memory Reboot» и «Fainted».

Кинематографичный синтвейв и атмосферная электронная музыка: эстетика ночных дорог, бесконечной скорости и воспоминаний, растворяющихся в неоновом тумане. Концептуальные альбомы «Insomnia» и «Genesis» объединили миллионы слушателей по всему миру.`,
      quote: '«Музыка ночных дорог, бесконечной скорости и воспоминаний, растворяющихся в неоновом тумане.»',
      quoteAuthor: '— NARVENT (ФАРХОД МУСУЛМОНОВ)',
      dawTitle: 'DAW И НАЧАЛО ПУТИ',
      dawValue: 'FL Studio (с ~2016 г.)',
      distroTitle: 'ДИСТРИБУЦИЯ',
      distroValue: 'Believe Digital / Utopia',
      riaaTitle: 'Золото RIAA',
      riaaValue: 'GOLD',
      riaaLabel: 'СЕРТИФИКАЦИЯ RIAA',
      riaaDetail: 'Официальный золотой статус «Memory Reboot» в США',
      billboardTitle: 'Billboard Hot Dance',
      billboardValue: '#13',
      billboardLabel: 'BILLBOARD HOT DANCE',
      billboardDetail: '13-я строчка главного чарта танцевальной и электронной музыки США',
      timelineBadge: 'ХРОНОЛОГИЯ 2019–2026',
      timelineTitle: 'Ключевые вехи эволюции звучания',
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
    },
    socials: {
      badge: 'ОФИЦИАЛЬНЫЕ ПЛОЩАДКИ // КАНАЛЫ',
      title: 'Социальные сети и стриминг',
      subtitle: 'Прямой доступ ко всем официальным профилям, стриминговым сервисам и фан-сообществам артиста.',
    },
    audioBar: {
      soundOn: 'ЗВУК ВКЛ',
      ambient: 'ЭМБИЕНТ',
      player: 'ПЛЕЕР',
      spotifyTitle: 'Официальный плеер Spotify',
      close: 'Закрыть плеер',
    },
    footer: {
      tagline: 'Атмосферные звуковые ландшафты, погружающие в эстетику ночных дорог, бесконечной скорости и кинематографичного синтвейва.',
      backToTop: 'В НАЧАЛО',
      copyright: `© ${new Date().getFullYear()} NARVENT (Фарход Мусулмонов). Официальная цифровая платформа.`,
      distribution: 'Дистрибуция через Believe Digital • Utopia Universe',
    },
    modal: {
      album: 'АЛЬБОМ',
      ep: 'МИНИ-АЛЬБОМ',
      single: 'СИНГЛ',
      released: 'Релиз',
      tracklist: 'Треклист',
      listenOn: 'СЛУШАТЬ В',
      close: 'Закрыть',
    },
  },
  en: {
    nav: {
      home: 'HOME',
      latest: 'LATEST',
      popular: 'TOP HITS',
      archive: '3D ARCHIVE',
      about: 'ABOUT',
      socials: 'SOCIALS',
      open3D: 'EXPLORE 3D DISCOGRAPHY',
      openMenu: 'Open Menu',
    },
    hero: {
      badge: 'OFFICIAL ARTIST PLATFORM',
      subtitle: 'Cinematic synthwave and electronic music.',
      bio: 'Farhod Musulmonov (better known as Narvent) — creator of viral global hits "Memory Reboot" and "Fainted". The aesthetics of night highways, endless speed, and memories dissolving in neon fog.',
      latestReleaseTag: 'NEW RELEASE 2026',
      tracksCount: 'TRACKS',
      listen: 'LISTEN',
      cta3D: '3D DISCOGRAPHY',
      ctaPopular: 'TOP TRACKS',
      ctaSpotify: 'SPOTIFY',
      riaaLabel: 'GOLD RIAA',
      riaaSub: 'US Certified Gold',
      billboardLabel: '#13 BILLBOARD',
      billboardSub: 'Hot Dance / Elec',
      telemetryFreq: 'FREQ // 432.0 HZ',
      telemetryLoc: 'CORE // DEEP SPACE',
    },
    latest: {
      badge: 'LATEST RELEASES // 2025–2026',
      title: 'Latest Releases',
      subtitle: 'Recent musical chapters and conceptual projects expanding the atmospheric universe of Narvent across global electronic playlists.',
      viewAll3D: 'VIEW ALL IN 3D',
      newReleaseBadge: 'NEW RELEASE',
      album: 'ALBUM',
      ep: 'EP',
      single: 'SINGLE',
      collab: 'COLLABORATION',
      tracksSuffix: 'tracks',
      officialMaster: 'Official Master',
      yearSuffix: '',
      listenRelease: 'LISTEN TO RELEASE',
      otherReleases: 'OTHER RECENT RELEASES',
      prev: 'Previous',
      next: 'Next',
      featWith: 'feat.',
    },
    popular: {
      badge: 'GLOBAL SINGLES // SPOTIFY',
      title: 'Essential Singles & Hits',
      subtitle: 'Defining singles and certified global releases that shaped the modern sound of atmospheric cinematic synthwave.',
      sortBadge: '[OFFICIAL SINGLES // SPOTIFY VERIFIED]',
      viralBadge: 'GLOBAL PHENOMENON',
      singleTag: 'SINGLE',
      listen: 'LISTEN',
      featWith: 'feat.',
      highlights: {
        'memory-reboot': 'RIAA Gold Certified (USA) • Peak #13 Billboard Hot Dance',
        'fainted': 'Cult global phenomenon of night aesthetics and viral automotive edits',
        'her-eyes': 'Melodic atmospheric synthwave that became a global trend',
        'distant-echoes': 'Collaborative single with producers VXLLAIN and VØJ',
        'euphoria': 'Energetic collaborative single with VØJ and KoruSe',
        'fade-into-darkness': 'Deep nocturnal atmospheric single in dark electronic style',
      },
    },
    archive: {
      badge: 'SPOTIFY API // VERIFIED 3D CATALOG',
      title: '3D Spotify Discography Archive',
      subtitle: 'All official studio albums, conceptual EPs, and singles of the artist connected directly to Spotify API in an interactive 3D space.',
      filterAll: 'ALL',
      filterAlbums: 'ALBUMS',
      filterEPs: 'EPS',
      filterSingles: 'SINGLES',
      filterCollabs: 'COLLABS',
      searchPlaceholder: 'Search...',
      view3D: '3D',
      viewGrid: 'GRID',
      spiralFullTitle: 'CHRONO-HELIX // SPOTIFY API',
      spiralMobileTitle: 'HELIX // SPOTIFY API',
      rotate: 'ROTATE',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset View',
      listenSpotify: 'SPOTIFY',
      openDetails: 'VIEW RELEASE',
    },
    about: {
      badge: 'ABOUT ARTIST // SOUND GENESIS',
      title: 'Architect of Nocturnal Sound',
      lead: 'Farhod Musulmonov (Narvent) — creator of global hits "Memory Reboot" and "Fainted", architect of cinematic synthwave.',
      bio: `Farhod Musulmonov (better known as Narvent) — creator of viral global hits "Memory Reboot" and "Fainted".

Cinematic synthwave and atmospheric electronic music: the aesthetics of night highways, endless speed, and memories dissolving in neon fog. Conceptual albums "Insomnia" and "Genesis" have connected millions of listeners worldwide.`,
      quote: '"Music of night roads, infinite speed, and memories dissolving in the neon fog."',
      quoteAuthor: '— NARVENT (FARHOD MUSULMONOV)',
      dawTitle: 'DAW & PRODUCTION ROOTS',
      dawValue: 'FL Studio (since ~2016)',
      distroTitle: 'DISTRIBUTION',
      distroValue: 'Believe Digital / Utopia',
      riaaTitle: 'RIAA Gold',
      riaaValue: 'GOLD',
      riaaLabel: 'RIAA CERTIFICATION',
      riaaDetail: 'Official Gold status of "Memory Reboot" in the USA',
      billboardTitle: 'Billboard Hot Dance',
      billboardValue: '#13',
      billboardLabel: 'BILLBOARD HOT DANCE',
      billboardDetail: '#13 on the premier US electronic and dance music chart',
      timelineBadge: 'TIMELINE 2019–2026',
      timelineTitle: 'Key Milestones of Sound Evolution',
      milestones: [
        {
          year: 2019,
          title: 'Debut "Endless Way"',
          desc: 'Release of the first album establishing the melancholic electronic foundation.',
        },
        {
          year: 2020,
          title: '"Forever In This World"',
          desc: 'Second studio album and notable collaborations, including iconic tracks with DVRST.',
        },
        {
          year: 2023,
          title: 'Global Triumph of "Memory Reboot"',
          desc: 'Historic collaboration with VØJ: RIAA Gold status in the USA and #13 on Billboard Hot Dance.',
        },
        {
          year: 2024,
          title: 'Conceptual Album "Insomnia"',
          desc: '13-track studio magnum opus featuring viral hits "Fainted", "Her Eyes", and collaborations with Adieu Aru.',
        },
        {
          year: 2025,
          title: 'Evolution of Dark Electronic Sound',
          desc: 'Singles "Fade Into Darkness", "Way Back Home" and broadening musical horizons.',
        },
        {
          year: 2026,
          title: 'New Era "Genesis"',
          desc: 'Monumental 17-track album "Genesis" accompanied by cosmic EP series "Recall" and "Ascend".',
        },
      ],
    },
    socials: {
      badge: 'OFFICIAL PLATFORMS // CHANNELS',
      title: 'Socials & Streaming',
      subtitle: 'Direct access to all official profiles, streaming platforms, and fan communities of the artist.',
    },
    audioBar: {
      soundOn: 'SOUND ON',
      ambient: 'AMBIENT',
      player: 'PLAYER',
      spotifyTitle: 'Official Spotify Player',
      close: 'Close Player',
    },
    footer: {
      tagline: 'Atmospheric soundscapes immersing listeners into the aesthetics of night highways, infinite speed, and cinematic synthwave.',
      backToTop: 'BACK TO TOP',
      copyright: `© ${new Date().getFullYear()} NARVENT (Farhod Musulmonov). Official Digital Platform.`,
      distribution: 'Distributed via Believe Digital • Utopia Universe',
    },
    modal: {
      album: 'ALBUM',
      ep: 'EP',
      single: 'SINGLE',
      released: 'Released',
      tracklist: 'Tracklist',
      listenOn: 'LISTEN ON',
      close: 'Close',
    },
  },
};
