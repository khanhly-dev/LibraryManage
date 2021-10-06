using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.EntityFrameworkCore
{
    public static class LibraryManagerDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<LibraryManagerDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<LibraryManagerDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
