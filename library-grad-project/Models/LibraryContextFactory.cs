using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class LibraryContextFactory : IDbContextFactory<LibraryContext>
    {
        public virtual LibraryContext Create()
        {
            return new LibraryContext();
        }
    }
}