import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LithiumX",
  description: "A powerful, simple, and effective stable Lavalink client developed in TypeScript.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: "Introduction",
        link: "/introduction",
        items: [
          { text: "Globals", link: "/globals" },
          { text: "Get Started", link: "/get-started" },
          { text: "Installation", link: "/installation" },
        ]
      },
      {
        text: 'Classes',
        items: [
          { text: 'Filters', link: '/classes/Filters' },
          { text: 'Manager', link: '/classes/LithiumXManager' },
          { text: 'Node', link: '/classes/LithiumXNode' },
          { text: 'Player', link: '/classes/LithiumXPlayer' },
          { text: 'Queue', link: '/classes/LithiumXQueue' },
          { text: 'Rest', link: '/classes/LithiumXRest' },
          { text: 'Plugin', link: '/classes/Plugin' },
          { text: 'Structure', link: '/classes/Structure' },
          { text: 'TrackUtils', link: '/classes/TrackUtils' },
        ]
      },
      {
        text: 'Interfaces',
        items: [
          { text: 'Band', link: '/interfaces/Band' },
          { text: 'CPUStats', link: '/interfaces/CPUStats' },
          { text: 'DistortionOptions', link: '/interfaces/DistortionOptions' },
          { text: 'Exception', link: '/interfaces/Exception' },
          { text: 'Extendable', link: '/interfaces/Extendable' },
          { text: 'FrameStats', link: '/interfaces/FrameStats' },
          { text: 'KaraokeOptions', link: '/interfaces/KaraokeOptions' },
          { text: 'LavalinkInfo', link: '/interfaces/LavalinkInfo' },
          { text: 'LavalinkResponse', link: '/interfaces/LavalinkResponse' },
          { text: 'ManagerEvents', link: '/interfaces/ManagerEvents' },
          { text: 'ManagerOptions', link: '/interfaces/ManagerOptions' },
          { text: 'MemoryStats', link: '/interfaces/MemoryStats' },
          { text: 'NodeMessage', link: '/interfaces/NodeMessage' },
          { text: 'NodeOptions', link: '/interfaces/NodeOptions' },
          { text: 'NodeStats', link: '/interfaces/NodeStats' },
          { text: 'PlayOptions', link: '/interfaces/PlayOptions' },
          { text: 'PlayerEvent', link: '/interfaces/PlayerEvent' },
          { text: 'PlayerOptions', link: '/interfaces/PlayerOptions' },
          { text: 'PlaylistData', link: '/interfaces/PlaylistData' },
          { text: 'PlaylistRawData', link: '/interfaces/PlaylistRawData' },
          { text: 'RotationOptions', link: '/interfaces/RotationOptions' },
          { text: 'SearchQuery', link: '/interfaces/SearchQuery' },
          { text: 'SearchResult', link: '/interfaces/SearchResult' },
          { text: 'TimescaleOptions', link: '/interfaces/TimescaleOptions' },
          { text: 'Track', link: '/interfaces/Track' },
          { text: 'TrackData', link: '/interfaces/TrackData' },
          { text: 'TrackDataInfo', link: '/interfaces/TrackDataInfo' },
          { text: 'TrackEndEvent', link: '/interfaces/TrackEndEvent' },
          { text: 'TrackExceptionEvent', link: '/interfaces/TrackExceptionEvent' },
          { text: 'TrackPluginInfo', link: '/interfaces/TrackPluginInfo' },
          { text: 'TrackStartEvent', link: '/interfaces/TrackStartEvent' },
          { text: 'TrackStuckEvent', link: '/interfaces/TrackStuckEvent' },
          { text: 'UnresolvedQuery', link: '/interfaces/UnresolvedQuery' },
          { text: 'UnresolvedTrack', link: '/interfaces/UnresolvedTrack' },
          { text: 'VibratoOptions', link: '/interfaces/VibratoOptions' },
          { text: 'VoicePacket', link: '/interfaces/VoicePacket' },
          { text: 'VoiceServer', link: '/interfaces/VoiceServer' },
          { text: 'VoiceState', link: '/interfaces/VoiceState' },
          { text: 'WebSocketClosedEvent', link: '/interfaces/WebSocketClosedEvent' }
        ]
      },
      {
        text: 'Type-aliases',
        items: [
          { text: 'LoadType', link: '/type-aliases/LoadType' },
          { text: 'Method', link: '/type-aliases/Method' },
          { text: 'PlayerEvents', link: '/type-aliases/PlayerEvents' },
          { text: 'PlayerEventType', link: '/type-aliases/PlayerEventType' },
          { text: 'SearchPlatform', link: '/type-aliases/SearchPlatform' },
          { text: 'Severity', link: '/type-aliases/Severity' },
          { text: 'Sizes', link: '/type-aliases/Sizes' },
          { text: 'State', link: '/type-aliases/State' },
          { text: 'TrackEndReason', link: '/type-aliases/TrackEndReason' },
          { text: 'TrackSourceName', link: '/type-aliases/TrackSourceName' }
        ]
      },
      {
        text: 'Variables',
        items: [
          { text: 'bassBoostEqualizer', link: '/variables/bassBoostEqualizer' },
          { text: 'softEqualizer', link: '/variables/softEqualizer' },
          { text: 'trebleBassEqualizer', link: '/variables/trebleBassEqualizer' },
          { text: 'tvEqualizer', link: '/variables/tvEqualizer' },
          { text: 'vaporwaveEqualizer', link: '/variables/vaporwaveEqualizer' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: "https://github.com/anantix-network/LithiumX" }
    ]
  }
})
