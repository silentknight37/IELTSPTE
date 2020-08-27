

CREATE TABLE [dbo].[Listening_ListeningSingleChoice](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Subject] [nvarchar](max) NULL,
	[ParagraghText] [nvarchar](max) NULL,
	[Questiontime] [int] NULL,
	[IsActive] [bit] NULL,
	[IsFree] [bit] NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](max) NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Listening_ListeningSingleChoice] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


