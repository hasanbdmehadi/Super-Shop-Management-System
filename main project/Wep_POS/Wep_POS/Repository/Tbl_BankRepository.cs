using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class Tbl_BankRepository: ITbl_BankRepository
    {
        POSEntities db = new POSEntities();
        public void AddBank(Bank aBank)
        {
            db.Banks.Add(aBank);
            db.SaveChanges();

        }

        public void UpdateBank(Bank aBank)
        {

            Bank dbProduct = GetBankById(aBank.BankSlNo);
            dbProduct.Company_SlNo = aBank.Company_SlNo;
            dbProduct.BankName = aBank.BankName;
            dbProduct.Note = aBank.Note;

            db.SaveChanges();

        }

        public void DeleteBank(int BankSlNo)
        {
            Bank aBank = GetBankById(BankSlNo);
            db.Banks.Remove(aBank);
            db.SaveChanges();

        }

        public List<Bank> GetAllBank()
        {
            return db.Banks.ToList();
        }

        public Bank GetBankById(int BankSlNo)
        {
            return db.Banks.SingleOrDefault(p => p.BankSlNo == BankSlNo);
        }



       
    }
}