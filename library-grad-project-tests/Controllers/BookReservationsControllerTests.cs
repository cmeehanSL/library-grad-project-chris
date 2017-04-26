using LibraryGradProject.Controllers;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Web;
using System.Linq;
using Moq;
using Xunit;

namespace LibraryGradProjectTests.Controllers
{
    public class BookReservationsControllerTests
    {
        [Fact]
        public void Get_Calls_ResRepo_GetAll()
        {
            // Arrange
            var mockRepo = new Mock<IRepository<BookReservation>>();
            mockRepo.Setup(mock => mock.GetAll());
            BookReservationsController controller = new BookReservationsController(mockRepo.Object);

            // Act
            controller.Get();

            // Assert
            mockRepo.Verify(mock => mock.GetAll(), Times.Once);
        }

        

    }
}
