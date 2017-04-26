using System.Collections.Generic;

namespace LibraryGradProject.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string PublishDate { get; set; }

        // One to many
        public ICollection<BookReservation> BookReservations { get; set; }
    }
}