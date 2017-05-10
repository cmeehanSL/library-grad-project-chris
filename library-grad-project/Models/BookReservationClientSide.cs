using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservationClientSide
    {
        public int BookId { get; set; }
        public string Date { get; set; }
        public int ReservationLength { get; set; }

    }
}