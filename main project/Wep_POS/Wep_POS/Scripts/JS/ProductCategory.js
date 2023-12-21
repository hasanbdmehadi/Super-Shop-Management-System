
//-----------------------------------   Delete  -----------------------------

function DeleteProductCategory(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Delete',
            type: 'POST',
            data: { ProductCategory_SlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblProductCategory").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//-----------------------------------------   End delete ----------------------------------


//-------------------------------------    Edit -----------------------------

function UpdateProductCategory(rowId) {
    $.ajax({
        url: 'GetProductCategoryById',
        type: 'POST',
        data: { ProductCategory_SlNo: rowId },
        success: function (data) {
            $('#ProductCategory_SlNo').val(data.ProductCategory_SlNo);
            $('#ProductCategory_Name').val(data.ProductCategory_Name);

        }
    });
}

//------------------------------   End Edit  ------------------------------------------




(function ($) {
    $(document).ready(function () {

        //----------------------------   Save ---------------------------------------------------------


        $('#btnSave').click(function () {

            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'Add',
                    type: 'POST',
                    data: JSON.stringify({
                        aProductCategory: {
                            ProductCategory_SlNo: $('#ProductCategory_SlNo').val(),
                            ProductCategory_Name: $('#ProductCategory_Name').val(),
                            Status: "A"
                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductCategory").trigger("reloadGrid");
                        alert('Data Save Successfully');
                        ClearAll();
                    }
                });
            }
        });

        //------------------------------   End Save -----------------------------------------------


        //----------------------------------  Update  ---------------------------------------------



        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'Update',
                    type: 'POST',
                    data: JSON.stringify({
                        aProductCategory: {
                            ProductCategory_SlNo: $('#ProductCategory_SlNo').val(),
                            ProductCategory_Name: $('#ProductCategory_Name').val(),
                            Status: "A"
                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductCategory").trigger("reloadGrid");
                        alert('Data Update Successfully');
                        ClearAll();
                    }
                });
            }s
        });

        //-----------------------------------   End Update-------------------------------------------

        function ClearAll() {
            $('#ProductCategory_SlNo').val(""),
            $('#ProductCategory_Name').val("")

        }

        //------------------------------------   Start Gried ----------------------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblProductCategory").setGridWidth(900);
            }
            else {
                $("#tblProductCategory").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblProductCategory").jqGrid({
            url: 'ProductCategoryDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ProductCategory_SlNo',
                name: 'ProductCategory_SlNo',
                index: 'ProductCategory_SlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Product Category Name',
                name: 'ProductCategory_Name',
                index: 'ProductCategory_Name',
                width: 300,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Creator',
                name: 'Creator',
                index: 'Creator',
                width: 250,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Date',
                name: 'CreationDate',
                index: 'CreationDate',
                width: 250,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 40, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 60, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#tblProductCategory").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblProductCategory').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateProductCategory(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblProductCategory").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteProductCategory(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblProductCategory").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#ProductCategoryPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ProductCategory_SlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Product Category',
            editurl: 'Update',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblProductCategory").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#tblProductCategory").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#tblProductCategory').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblProductCategory').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblProductCategory').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblProductCategory").jqGrid('navGrid', '#ProductCategoryPager', {
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





     

        $('#ProductCategory_Name').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

      


        function insert_update() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

           


            if ($('#ProductCategory_Name').val() == '') {
                $('#ProductCategory_Name').focus();
                return false;
            }

            return true;
        }



        //check charcode for ProductCategory_Name

        $('#ProductCategory_Name').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 150) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 150');
                    return false;
                }
            }
        });

        //end check charcode for ProductCategory_Name














     





    });
})(jQuery);