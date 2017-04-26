using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public int BookReservationId { get; set; }
        public DateTime Time { get; set; }
        
        // Foreign Key to Book
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}