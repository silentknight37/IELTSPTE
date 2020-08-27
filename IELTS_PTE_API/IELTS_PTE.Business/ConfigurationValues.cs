using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace IELTS_PTE.Business
{
    public class ConfigurationValues
    {
        private static IConfigurationRoot _config;

        public static IConfiguration Configuration
        {
            get
            {
                if (_config != null)
                {
                    return _config;
                }

                var builder = new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.json",
                        optional: true,
                        reloadOnChange: true);

                return _config = builder.Build();
            }
        }

        public static string EMAIL_HOST => Configuration.GetValue<string>("Host:Email");

    }
}
