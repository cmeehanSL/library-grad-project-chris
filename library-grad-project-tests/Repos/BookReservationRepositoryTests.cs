using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookReservationRepositoryTests : System.IDisposable
    {

        private BookReservationRepository repo;

        public BookReservationRepositoryTests()
        {
            prepareInMemDb();
        }

        private void prepareInMemDb()
        {
            var MockResDbSet = new FakeBookReservationSet();
            var MockContext = new Mock<LibraryContext>();

            MockContext.Setup(c => c.BookReservations).Returns(MockResDbSet);

            var MockContextFactory = new Mock<LibraryContextFactory>();
            MockContextFactory.Setup(cf => cf.Create()).Returns(MockContext.Object);

            repo = new BookReservationRepository(MockContextFactory.Object);

        }

        public void Dispose()
        {
            var MockBookReservationDbSet = new FakeBookReservationSet();
            MockBookReservationDbSet.Clear();
        }

        [Fact]
        public void New_Book__Reservation_Repository_Is_Empty()
        {
            // Arrange
            //BookReservationRepository repo = new BookReservationRepository();
            prepareInMemDb();

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Empty(bookReservations);
        }

        [Fact]
        public void Add_Inserts_New_Reservation()
        {
            // Arrange
            prepareInMemDb();

            BookReservation newRes = new BookReservation() { BookId = 1 };

            // Act
            repo.Add(newRes);
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Assert
            Assert.Equal(new BookReservation[] { newRes }, bookReservations.ToArray());

        }

        [Fact]
        public void Get_Returns_Specific_Reservation()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            BookReservation newRes1 = new BookReservation() { BookReservationId = 1, BookId = 1};
            BookReservation newRes2 = new BookReservation() { BookReservationId = 2, BookId = 2};
            repo.Add(newRes1);
            repo.Add(newRes2);

            // Act
            BookReservation bookReservation = repo.Get(2);

            // Asert
            Assert.Equal(newRes2, bookReservation);
        }

        [Fact]
        public void Get_All_Returns_All_Reservations()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            BookReservation newRes1 = new BookReservation() { BookId = 3 };
            BookReservation newRes2 = new BookReservation() { BookId = 4 };
            repo.Add(newRes1);
            repo.Add(newRes2);

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newRes1, newRes2 }, bookReservations.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            BookReservation newRes1 = new BookReservation() { BookId = 1, BookReservationId = 1 };
            BookReservation newRes2 = new BookReservation() { BookId = 2, BookReservationId = 2 };
            BookReservation newRes3 = new BookReservation() { BookId = 3, BookReservationId = 3 };
            repo.Add(newRes1);
            repo.Add(newRes2);
            repo.Add(newRes3);

            // Act
            repo.Remove(1);
            IEnumerable<BookReservation> books = repo.GetAll();

            // Asert
            Assert.Equal(new BookReservation[] { newRes2, newRes3 }, books.ToArray());
        }

        [Fact]
        public void Does_Not_Add_Conflicting_Reservation()
        {
            // Arrange
            prepareInMemDb();

            DateTime time1 = DateTime.ParseExact("04/06/2017 15:00:00", "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            DateTime time2 = DateTime.ParseExact("05/06/2017 16:00:00", "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);


            BookReservation newRes1 = new BookReservation() { BookReservationId = 1, BookId = 1, Time = time1 };
            BookReservation newRes2 = new BookReservation() { BookReservationId = 2, BookId = 1, Time = time2 };
            BookReservation newRes3 = new BookReservation() { BookReservationId = 3, BookId = 2, Time = time2 };
            repo.Add(newRes1);
            repo.Add(newRes2);
            repo.Add(newRes3);

            // Act
            IEnumerable<BookReservation> bookReservations = repo.GetAll();

            // Assert
            Assert.Equal(new BookReservation[] { newRes1, newRes3 }, bookReservations.ToArray());
        }


    }
}
