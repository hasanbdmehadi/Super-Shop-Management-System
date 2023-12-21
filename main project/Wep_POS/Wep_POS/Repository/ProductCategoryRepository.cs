using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {
        POSEntities db = new POSEntities();
        public void Add(ProductCategory aProductCategory)
        {
            db.ProductCategories.Add(aProductCategory);
            db.SaveChanges();
           
        }

        public void Update(ProductCategory aProductCategory)
        {

            ProductCategory dbProduct = GetProductCategoryById(aProductCategory.ProductCategory_SlNo);
            dbProduct.ProductCategory_Name = aProductCategory.ProductCategory_Name;            
            db.SaveChanges();
           
        }

        public void Delete(int ProductCategory_SlNo)
        {
            ProductCategory Product = GetProductCategoryById(ProductCategory_SlNo);
            db.ProductCategories.Remove(Product);
            db.SaveChanges();
            
        }

        public List<ProductCategory> GetAllProductCategory()
        {
            return db.ProductCategories.ToList();
        }

        public ProductCategory GetProductCategoryById(int ProductCategory_SlNo)
        {
            return db.ProductCategories.SingleOrDefault(p => p.ProductCategory_SlNo == ProductCategory_SlNo);  
        }



       
    }
}