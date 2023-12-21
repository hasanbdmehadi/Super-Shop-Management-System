
//-----------------------------------   Delete  -----------------------------

function DeleteProductInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteProductInfo',
            type: 'POST',
            data: { Product_SlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblProductInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//-----------------------------------------   End delete ----------------------------------


//-------------------------------------    Edit -----------------------------

function UpdateProductInfo(rowId) {
    $.ajax({
        url: 'GetProductInfoById',
        type: 'POST',
        data: { Product_SlNo: rowId },
        success: function (data) {
            $('#Product_SlNo').val(data.Product_SlNo);
            $('#ProductCode').val(data.ProductCode);
            $('#ProductName').val(data.ProductName);
            $('#Product_Barcode').val(data.Product_Barcode);
            $('#ProductType').val(data.ProductType);
            $('#ProductCategory_SlNo').val(data.ProductCategory_SlNo);
            $('#ReorderLevel').val(data.ReorderLevel);
            $('#Purchase_Rate').val(data.Purchase_Rate);
            $('#Sell_Rate').val(data.Sell_Rate);
            $('#ProductImage').val(data.ProductImage);
            $('#Note').val(data.Note);

        }
    });
}

//------------------------------   End Edit  ------------------------------------------


//----------------------------   Save ---------------------------------------------------------
(function ($) {
    $(document).ready(function () {

        $('#btnSave').click(function () {
            var retval = insert_update();       
            if (retval == true) {
                $.ajax({
                    url: 'AddProductInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        aProductInfo: {
                            Product_SlNo: $('#Product_SlNo').val(),
                            ProductCode: $('#ProductCode').val(),
                            ProductName: $('#ProductName').val(),
                            Product_Barcode: $('#Product_Barcode').val(),
                            ProductType: $('#ProductType').val(),
                            ProductCategory_SlNo: $('#ProductCategory_SlNo').val(),
                            ReorderLevel: $('#ReorderLevel').val(),
                            Purchase_Rate: $('#Purchase_Rate').val(),
                            Sell_Rate: $('#Sell_Rate').val(),
                            ProductImage: $('#ProductImage').val(),
                            Note: $('#Note').val(),
                            Status: "A"
                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductInfo").trigger("reloadGrid");
                        alert('Data Save Successfully');
                        ClearAll();
                    }
                
                });
            }
        });

        //---------------------------- END  Save ---------------------------------------------------------
        //----------------------------------  Update  ---------------------------------------------



        $('#btnUpdate').click(function () {

            $.ajax({
                url: 'UpdateProductInfo',
                type: 'POST',
                data: JSON.stringify({
                    aProductInfo: {
                        Product_SlNo: $('#Product_SlNo').val(),
                        ProductCode: $('#ProductCode').val(),
                        ProductName: $('#ProductName').val(),
                        Product_Barcode: $('#Product_Barcode').val(),
                        ProductType: $('#ProductType').val(),
                        ProductCategory_SlNo: $('#ProductCategory_SlNo').val(),
                        ReorderLevel: $('#ReorderLevel').val(),
                        Purchase_Rate: $('#Purchase_Rate').val(),
                        Sell_Rate: $('#Sell_Rate').val(),
                        ProductImage: $('#ProductImage').val(),
                        Note: $('#Note').val(),
                        Status: "A"
                    }
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#ProductInfo").trigger("reloadGrid");
                    alert('Data Update Successfully');
                    ClearAll();
                }
            });
        });

        //-----------------------------------   End Update-------------------------------------------
        // Clear 
        function ClearAll() {
            $('#Product_SlNo').val(""),
            $('#ProductCode').val("")

        }
        // End Clear 

        //------------------------------------   Start Gried ----------------------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblProductInfo").setGridWidth(900);
            }
            else {
                $("#tblProductInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblProductInfo").jqGrid({
            url: 'ProductInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'Product SlNo',
                name: 'Product_SlNo',
                index: 'Product_SlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Product Code',
                name: 'ProductCode',
                index: 'ProductCode',
                width: 300,
                editable: true,
                edittype: 'text'
            }
            , {
                label: 'Product Name',
                name: 'ProductName',
                index: 'ProductName',
                width: 100,
                editable: true,
                edittype: 'text'
            }
            //, {
            //    label: 'Product Type',
            //    name: 'ProductType',
            //    index: 'ProductType',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            //, {
            //    label: 'ProductCategory SlNo',
            //    name: 'ProductCategory_SlNo',
            //    index: 'ProductCategory_SlNo',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            //, {
            //    label: 'Reorder Level',
            //    name: 'ReorderLevel',
            //    index: 'ReorderLevel',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            //, {
            //    label: 'Purchase Rate',
            //    name: 'Purchase_Rate',
            //    index: 'Purchase_Rate',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            //, {
            //    label: 'Sell Rate',
            //    name: 'Sell_Rate',
            //    index: 'Sell_Rate',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            //, {
            //    label: 'Note',
            //    name: 'Note',
            //    index: 'Note',
            //    width: 100,
            //    editable: true,
            //    edittype: 'text'
            //}
            ,
            {
                name: 'Edit', index: 'Edit', width: 65, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 70, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#tblProductInfo").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblProductInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateProductInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblProductInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteProductInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblProductInfo").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#ProductInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "Product_SlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Product Info',
            editurl: 'UpdateProductInfo',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblProductInfo").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#tblProductInfo").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#tblProductInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblProductInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblProductInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblProductInfo").jqGrid('navGrid', '#ProductInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Bankupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Bankadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Bankdelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid
        //------------------------------------  End  Gried ------------------------------------------
        //_________________________ Validation _________________________________

        //Textbox Validation

        $('#ProductCode').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#ProductName').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        
        $('#ProductType').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#ReorderLevel').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        
        

       // ------------------------------  Drop Down----------------------
                $("#ProductCategory_SlNo").change(function () {
            $("#ProductCategory_SlNo").css('backgroune-color', '');
        });
    //  ------------------------------  Drop Down----------------------





        function insert_update() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });







            if ($('#ProductCode').val() == '') {
                $('#ProductCode').focus();
                return false;
            }
            if ($('#ProductName').val() == '') {
                $('#ProductName').focus();
                return false;
            }
            
            if ($('#ProductType').val() == '') {
                $('#ProductType').focus();
                return false;
            }
            if ($('#ReorderLevel').val() == '') {
                $('#ReorderLevel').focus();
                return false;
            }
            //---------  Drop Down---------
            if ($('#ProductCategory_SlNo').val() == 0) {
                alert('Please select company');
                $("#ProductCategory_SlNo").css('background-color', 'red');
                $('#ProductCategory_SlNo').focus();
                return false;
            }
            //---------  Drop Down---------


            return true;
        }


       


   // ------------------------------  Drop Down----------------------
        //if ($('#ProductCategory_SlNo').val() == 0) {
        //        alert('Please select Product');
        //        $("#ProductCategory_SlNo").css('background-color', 'red');
        //        $('#ProductCategory_SlNo').focus();
        //        return false;
        //    }
   // ------------------------------  Drop Down----------------------
    

  

    });
})(jQuery);