interface CommentType {
  _id: string
  source_id: string // 文章或沸点ID
  source_type: 1 | 2 // 1: 文章，2: 沸点
  type: 'source' | 'comment' | 'reply' // source: 内容，comment: 评论，reply: 回复
  parent_id: string // 父级评论的 ID
  reply_id: string // 回复某个评论的 ID
  target_user: string // 评论对象创建者ID
  content: string // 评论内容
  created_by: string // 创建者
  created_at: string // 创建时间
}

interface CommentResultType {
  _id: string
  content: string // 评论内容
  created_by: Partial<UserType>
  replies: CommentRepliyType[]
  created_at: string
}

interface CommentRepliyType {
  _id: string
  reply_id?: string
  content: string
  created_by: Partial<UserType>
  created_at: string
}
