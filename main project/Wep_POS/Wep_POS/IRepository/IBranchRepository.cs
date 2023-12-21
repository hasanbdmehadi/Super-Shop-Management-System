using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
    public interface IBranchRepository
    {
        void AddBranch(Branch aBranch);
        void UpdateBranch(Branch aBranch);
        void DeleteBranch(int BranchSlNo);
        List<Branch> GetAllBranch();
        Branch GetBranchById(int BranchSlNo);


       
    }
}
