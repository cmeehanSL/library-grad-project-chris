using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryGradProject.Models;
using FakeDbSet;

namespace LibraryGradProjectTests.Repos
{
    public class FakeBookSet : FakeDbSet.InMemoryDbSet<Book>
    {
        public override Book Find(params object[] keyValues)
        {
            return this.SingleOrDefault(b => b.BookId == (int)keyValues.Single());
        }
    }
}
