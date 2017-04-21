using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;

namespace LibraryGradProject.Models
{
    public class LibraryContext : DbContext
    {


        public DbSet<Book> Books { get; set; }
        public DbSet<BookReservation> BookReservations { get; set; }
    }
}