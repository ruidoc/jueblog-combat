const categories = [
  {
    key: 'all',
    label: '综合',
    icon: 'compass',
  },
  {
    key: 'frontend',
    label: '前端',
    icon: 'baseball',
  },
  {
    key: 'backend',
    label: '后端',
    icon: 'football',
  },
  {
    key: 'android',
    label: '安卓',
    icon: 'hot-water',
  },
  {
    key: 'ios',
    label: 'IOS',
    icon: 'apple',
  },
  {
    key: 'ai',
    label: 'AI',
    icon: 'cpu',
  },
  {
    key: 'tool',
    label: '开发工具',
    icon: 'mouse',
  },
  {
    key: 'life',
    label: '代码人生',
    icon: 'clock',
  },
]

const groups = [
  {
    key: 'all',
    label: '综合',
    icon: 'orange',
  },
  {
    key: 'follow',
    label: '关注',
    icon: 'female',
  },
  {
    key: 'circles',
    label: '圈子',
    icon: 'coin',
    children: [
      {
        key: 'daily',
        label: '打工日常',
      },
      {
        key: 'techno',
        label: '技术圈',
      },
      {
        key: 'blind_date',
        label: '相亲角',
      },
      {
        key: 'slack_off',
        label: '上班摸鱼',
      },
      {
        key: 'eating',
        label: '中午吃啥',
      },
      {
        key: 'playing',
        label: '下班去哪玩',
      },
      {
        key: 'bigtea',
        label: '在线吃瓜',
      },
    ],
  },
]

module.exports = {
  categories,
  groups,
}
