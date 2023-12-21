using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class ProductInfoRepository : IProductInfoRepository
    {
        POSEntities db = new POSEntities();
        public void AddProductInfo(ProductInfo aProductInfo)
        {
            db.ProductInfoes.Add(aProductInfo);
            db.SaveChanges();

        }

        public void UpdateProductInfo(ProductInfo aProductInfo)
        {

            ProductInfo dbProduct = GetProductInfoById(aProductInfo.Product_SlNo);
            dbProduct.ProductCode = aProductInfo.ProductCode;
            dbProduct.ProductName = aProductInfo.ProductName;
            dbProduct.Product_Barcode = aProductInfo.Product_Barcode;
            dbProduct.ProductType = aProductInfo.ProductType;
            dbProduct.ProductCategory_SlNo = aProductInfo.ProductCategory_SlNo;
            dbProduct.ReorderLevel = aProductInfo.ReorderLevel;
            dbProduct.Purchase_Rate = aProductInfo.Purchase_Rate;
            dbProduct.Sell_Rate = aProductInfo.Sell_Rate;
            dbProduct.Note = aProductInfo.Note;
            db.SaveChanges();

        }

        public void DeleteProductInfo(int Product_SlNo)
        {
            ProductInfo Product = GetProductInfoById(Product_SlNo);
            db.ProductInfoes.Remove(Product);
            db.SaveChanges();

        }

        public List<ProductInfo> GetAllProductInfo()
        {
            return db.ProductInfoes.ToList();
        }

        public ProductInfo GetProductInfoById(int Product_SlNo)
        {
            return db.ProductInfoes.SingleOrDefault(p => p.Product_SlNo == Product_SlNo);
        }  
    }
}