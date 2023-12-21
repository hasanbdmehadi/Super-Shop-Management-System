using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class BranchRepository : IBranchRepository
    {
        POSEntities db = new POSEntities();
        public void AddBranch(Branch aBranch)
        {
            db.Branches.Add(aBranch);
            db.SaveChanges();
        }
        public void UpdateBranch(Branch aBranch)
        {
            Branch bdBranch = GetBranchById(aBranch.BranchSlNo);
            bdBranch.BranchName = aBranch.BranchName;
            bdBranch.Company_SlNo = aBranch.Company_SlNo;
            bdBranch.BankSlNo = aBranch.BankSlNo;
            
            bdBranch.Address=aBranch.Address;
            bdBranch.Phone = aBranch.Phone;
            bdBranch.Mobile = aBranch.Mobile;
            bdBranch.Email = aBranch.Email;
            bdBranch.Note = aBranch.Note;
           
            bdBranch.CreationDate = aBranch.CreationDate;
           
            bdBranch.ModificationDate = aBranch.ModificationDate;
            
            
            db.SaveChanges();
        }
        public void DeleteBranch(int BranchSlNo)
        {
            Branch dbBranch = GetBranchById(BranchSlNo);
            db.Branches.Remove(dbBranch);
            db.SaveChanges();

        }

        public List<Branch> GetAllBranch()
        {
            return db.Branches.ToList();
        }

        public Branch GetBranchById(int BranchSlNo)
        {
            return db.Branches.SingleOrDefault(p => p.BranchSlNo == BranchSlNo);
        }


      
    }
}