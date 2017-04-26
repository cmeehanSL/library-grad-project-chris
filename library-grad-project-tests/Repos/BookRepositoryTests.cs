using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using Moq;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Xunit;

namespace LibraryGradProjectTests.Repos
{
    public class BookRepositoryTests : System.IDisposable
    {

        private BookRepository repo;

        public BookRepositoryTests()
        {
            prepareInMemDb();
        }

        private void prepareInMemDb()
        {
            var MockBookDbSet = new FakeBookSet();
            var MockContext = new Mock<LibraryContext>();

            MockContext.Setup(c => c.Books).Returns(MockBookDbSet);

            var MockContextFactory = new Mock<LibraryContextFactory>();
            MockContextFactory.Setup(cf => cf.Create()).Returns(MockContext.Object);

            repo = new BookRepository(MockContextFactory.Object);

        }

        public void Dispose()
        {
            var MockBookDbSet = new FakeBookSet();
            MockBookDbSet.Clear();
        }




        [Fact]
        public void New_Book_Repository_Is_Empty()
        {
            //// Arrange
            //var MockSet = new Mock<DbSet<Book>>();
            prepareInMemDb();

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Empty(books);
        }

        [Fact]
        public void Add_Inserts_New_Book()
        {
            // Arrange
            prepareInMemDb();

            Book newBook = new Book() { Title = "Test" };

            // Act
            repo.Add(newBook);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] {newBook}, books.ToArray());
        }

        //[Fact]
        //public void Add_Sets_New_Id()
        //{
        //    // Arrange
        //    prepareInMemDb();

        //    //BookRepository repo = new BookRepository();
        //    Book newBook = new Book() { Title = "Test" };

        //    // Act
        //    repo.Add(newBook);
        //    IEnumerable<Book> books = repo.GetAll();

        //    // Asert
        //    Assert.Equal(0, books.First().BookId);
        //}

        [Fact]
        public void Get_Returns_Specific_Book()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            Book newBook1 = new Book() { BookId = 0, Title = "Test1" };
            Book newBook2 = new Book() { BookId = 1, Title = "Test2" };
            repo.Add(newBook1);
            repo.Add(newBook2);

            // Act
            Book book = repo.Get(1);

            // Asert
            Assert.Equal(newBook2, book);
        }

        [Fact]
        public void Get_All_Returns_All_Books()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            Book newBook1 = new Book() { Title = "Test1" };
            Book newBook2 = new Book() { Title = "Test2" };
            repo.Add(newBook1);
            repo.Add(newBook2);

            // Act
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook1, newBook2 }, books.ToArray());
        }

        [Fact]
        public void Delete_Removes_Correct_Book()
        {
            // Arrange
            prepareInMemDb();

            //BookRepository repo = new BookRepository();
            Book newBook1 = new Book() { BookId = 0, Title = "Test1" };
            Book newBook2 = new Book() { BookId = 1, Title = "Test2" };
            Book newBook3 = new Book() { BookId = 2, Title = "Test3" };
            repo.Add(newBook1);
            repo.Add(newBook2);
            repo.Add(newBook3);

            // Act
            repo.Remove(1);
            IEnumerable<Book> books = repo.GetAll();

            // Asert
            Assert.Equal(new Book[] { newBook1, newBook3 }, books.ToArray());
        }
    }
}
