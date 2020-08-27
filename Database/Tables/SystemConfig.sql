

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SystemConfig](
	[SystemConfigID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NOT NULL,
	[Value] [nvarchar](255) NOT NULL,
	[Description] [ntext] NULL,
	[EnterpriseSystemId] [int] NOT NULL,
	[CreatedBy] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](50) NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_SystemConfig] PRIMARY KEY CLUSTERED 
(
	[SystemConfigID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY],
 CONSTRAINT [IX_SystemConfig] UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[SystemConfig] ADD  CONSTRAINT [DF_SystemConfig_CreatedBy]  DEFAULT (suser_sname()) FOR [CreatedBy]
GO

ALTER TABLE [dbo].[SystemConfig] ADD  CONSTRAINT [DF_SystemConfig_CreatedDate]  DEFAULT (getutcdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[SystemConfig] ADD  CONSTRAINT [DF_SystemConfig_UpdatedBy]  DEFAULT (suser_sname()) FOR [UpdatedBy]
GO

ALTER TABLE [dbo].[SystemConfig] ADD  CONSTRAINT [DF_SystemConfig_UpdatedDate]  DEFAULT (getutcdate()) FOR [UpdatedDate]
GO


