interface ShortMsgType {
  _id: string
  group: string
  comments: number
  images: string[]
  content: string
  created_at: string
  created_by: string
  is_praise: boolean
  praises: number
  updated_at: string
  user: UserInfoType
}

interface GroupType {
  key: string
  icon?: string
  label: string
  children?: GroupType[]
}
