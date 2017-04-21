using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public int Id { get; set; }
        public int Book { get; set; }
        public DateTime Time { get; set; }

    }
}