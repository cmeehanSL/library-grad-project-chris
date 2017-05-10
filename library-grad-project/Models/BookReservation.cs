using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Models
{
    public class BookReservation
    {
        public int BookReservationId { get; set; }
        public DateTime Date { get; set; }
        public int ReservationLength { get; set; }
        
        // Foreign Key to Book
        public int BookId { get; set; }

        // Make virtual for lazy loading, get the book when the 'Book' property is dereferenced
        public Book Book { get; set; }

    }
}