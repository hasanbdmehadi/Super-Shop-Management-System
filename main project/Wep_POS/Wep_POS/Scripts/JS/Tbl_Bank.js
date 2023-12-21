//-----------------------------------   Delete  -----------------------------

function DeleteBank(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteBank',
            type: 'POST',
            data: { BankSlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#Bank").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        }); 
    }
}

//-----------------------------------------   End delete ----------------------------------

//-------------------------------------    Edit -----------------------------

function UpdateBanks(rowId) {
    $.ajax({
        url: 'GetBankById',
        type: 'POST',
        data: { BankSlNo: rowId },
        success: function (data) {
           
            $('#Company_SlNo').val(data.Company_SlNo);
            $('#BankName').val(data.BankName);
            $('#Note').val(data.Note);
        }
    });
}

//------------------------------   End Edit  ------------------------------------------
// -------------------------------- SAVE ----------------------------------------------
(function ($) {
    $(document).ready(function () {

        $('#btnSave').click(function () {

            $.ajax({
                url: 'AddBank',
                type: 'POST',
                data: JSON.stringify({
                    aBank: {
                        BankSlNo: $('#BankSlNo').val(),
                        Company_SlNo: $('#Company_SlNo').val(),
                        BankName: $('#BankName').val(),
                        Note: $('#Note').val(),
                        Status: "A"
                        
                        
                    }
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#Bank").trigger("reloadGrid");
                    alert('Data Save Successfully');
                    ClearAll();
                }
            });
        });

// -------------------------------------- END  SAVE ----------------------------------------------

        //----------------------------------  Update  ---------------------------------------------



        $('#btnUpdate').click(function () {
         
            $.ajax({
                url: 'UpdateBank',
                type: 'POST',
                data: JSON.stringify({
                    aBank: {
                        BankSlNo: $('#BankSlNo').val(),
                        BankName: $('#BankName').val(),
                        Note: $('#Note').val(),
                        Status: "A"
                    }
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#Bank").trigger("reloadGrid");
                    alert('Data Updated Successfully');
                    ClearAll();
                }
            });
        });

        //-----------------------------------   End Update-------------------------------------------

        // Clear 
        function ClearAll() {
            $('#BankSlNo').val(""),
            $('#BankName').val("")

        }
        // End Clear 

        //------------------------------------   Start Gried ----------------------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#Bank").setGridWidth(900);
            }
            else {
                $("#Bank").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#Bank").jqGrid({
            url: 'BankDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'Bank SlNo',
                name: 'BankSlNo',
                index: 'BankSlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, 
            {
                label: 'Company Sl No',
                name: 'Company_SlNo',
                index: 'Company_SlNo',
                width: 250,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Bank Name',
                name: 'BankName',
                index: 'BankName',
                width: 250,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 265,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 65, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 70, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#Bank").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#Bank').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateBanks(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#Bank").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteBank(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#Bank").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#BankPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BankSlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Bank',
            editurl: 'Update',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#Bank").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#Bank").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#Bank').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblBank').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#Bank').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#Bank").jqGrid('navGrid', '#BankPager', {
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

    });
})(jQuery);