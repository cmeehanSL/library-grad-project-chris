using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    class BookReservationRepositoryTests
    {
        [Fact]
        public void New_Book__Reservation_Repository_Is_Empty()
        {
            // Arrange
            BookReservationRepository repo = new BookReservationRepository();

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Empty(bookReservations);
        }
    }
}
