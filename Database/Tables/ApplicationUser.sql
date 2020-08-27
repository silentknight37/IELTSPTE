
/****** Object:  Table [Admin].[User]    Script Date: 07/12/2019 16:48:40 ******/

CREATE TABLE [dbo].[ApplicationUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](200) NULL,
	[LastName] [nvarchar](200) NOT NULL,
	[Mobile] [nvarchar](50) NOT NULL,
	[VerificationCode] [nvarchar](100) NOT NULL,
	[IsActive] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_AppUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 

GO