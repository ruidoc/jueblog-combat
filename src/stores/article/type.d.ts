interface ArticleType {
  _id: string
  category: string
  comments: number
  content: string
  created_at: string
  created_by: string
  intro: string
  is_praise: boolean
  is_start?: boolean
  stars?: number
  page_view: number
  praises: number
  status: 0 | 1
  tags: string[]
  title: string
  updated_at: string
  user: UserType
}

interface CategoryType {
  key: string
  label: string
}
