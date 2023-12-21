




//-----------------------ClearAll--------------------------------
function ClearAll() {
    $('#Company_SlNo').val("");
    $('#Company_Name').val("");
    $('#Company_Description').val("");


}
//--------------------------End ClearAll------------------------------------


//-----------------------------------   Delete  -----------------------------

function DeleteCompany(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteCompany',
            type: 'POST',
            data: { Company_SlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#Company").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//-----------------------------------------   End delete ----------------------------------


//-------------------------------------    Edit -----------------------------

function UpdateCompany(rowId) {
    $.ajax({
        url: 'GetTbl_CompanyById',
        type: 'POST',
        data: { Company_SlNo: rowId },
        success: function (data) {
            $('#Company_SlNo').val(data.Company_SlNo);
            $('#Company_Name').val(data.Company_Name);
            $('#Company_Description').val(data.Company_Description);

        }
    });
}

//------------------------------   End Edit  ------------------------------------------




//--------------------------For Save Button----------------------------------
(function ($) {
    $(document).ready(function () {
       

        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: 'AddCompany',
                    type: 'POST',

                    data: JSON.stringify({

                        aTbl_Company: {

                            Company_SlNo: $('#Company_SlNo').val(),
                            Company_Name: $('#Company_Name').val(),
                            Company_Description: $('#Company_Description').val(),
                            Status: "A"
                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#Company").trigger("reloadGrid");
                        alert('Data Save Successfully');
                        ClearAll();

                    }
                });
            }
        });




//----------------------------------End Save-------------------------------------


//---------------------------------------Update Button------------------------------

        $('#btnUpdate').click(function () {

            $.ajax({
                url: 'UpdateCompany',
                type: 'POST',

                data: JSON.stringify({
                    
                    aTbl_Company: {

                        Company_SlNo: $('#Company_SlNo').val(),
                        Company_Name: $('#Company_Name').val(),
                        Company_Description: $('#Company_Description').val(),
                        Status: "A"
                    }
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#Company").trigger("reloadGrid");
                    alert('Data Updated Successfully');
                    ClearAll();

                }
            });
        });

        //---------------------------------------End Update---------------------------------

        //------------------------------------   Start Gried ----------------------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#Company").setGridWidth(900);
            }
            else {
                $("#Company").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#Company").jqGrid({
            url: 'CompanyDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'Company_SlNo',
                name: 'Company_SlNo',
                index: 'Company_SlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Company Name',
                name: 'Company_Name',
                index: 'Company_Name',
                width: 300,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Company Description',
                name: 'Company_Description',
                index: 'Company_Description',
                width: 300,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 150, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 150, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#Company").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#Company').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateCompany(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#Company").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteCompany(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#Company").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#CompanyPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "Company_SlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Company',
            editurl: 'UpdateCompany',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#Company").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#Company").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#Company').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#Company').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#Company').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });
       
        $("#Company").jqGrid('navGrid', '#CompanyPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/UpdateCompany',
            closeAfterEdit: true
        }, {
            url: '/Setup/AddCompany',
            closeAfterAdd: true
        }, {
            url: '/Setup/deleteCompany',
            closeAfterDelete: true
        }, {});

        //End jQGrid
        //------------------------------------  End  Gried ------------------------------------------
        //--------------------------------------Start Validation-----------------------------------


        $('#Company_Name').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Company_Description').bind('keypress', function (evt) {
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




            if ($('#Company_Name').val() == '') {
                $('#Company_Name').focus();
                return false;
            }
            if ($('#Company_Description').val() == '') {
                $('#Company_Description').focus();
                return false;
            }

            return true;
        }



        //check charcode for Company_Name

        $('#Company_Name').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 200) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 200');
                    return false;
                }
            }
        });

        //end check charcode for Company_Name


        //check charcode for Company_Description

        $('#Company_Description').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 500) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 500');
                    return false;
                }
            }
        });

        //end check charcode for Company_Description













        //Charcode validation for phone 

        //$('#ProductCategory_Name').bind('keypress', function (evt) {
        //    var charcode = (evt.which);

        //    if ($(this).val().length > 15) {
        //        if (charcode == 8) {
        //            return true;
        //        }
        //        else {
        //            alert('Max length is =15');
        //            return false;
        //        }
        //    }

        //    //new one (+) COde...

        //    var fieldValue = $(this).val().split('');
        //    var countdecimal = 0;
        //    for (var i = 0; i < fieldValue.length; i++) {
        //        if (fieldValue[i] == '+') {
        //            countdecimal++;
        //            if (countdecimal > 0) {
        //                if (charcode == 8) {
        //                    return true;
        //                }
        //                if (charcode == 43) {
        //                    alert('Only One + point is allowed');
        //                    return false;
        //                }
        //            }
        //        }
        //    }

        //    //End one {+} number use( biltinnnnn)COde...

        //    //new one {(} number use( biltinnnnn)COde...


        //    var fieldValue = $(this).val().split('');
        //    var countdecimal = 0;
        //    for (var i = 0; i < fieldValue.length; i++) {
        //        if (fieldValue[i] == '(') {
        //            countdecimal++;
        //            if (countdecimal > 0) {
        //                if (charcode == 8) {
        //                    return true;
        //                }
        //                if (charcode == 40) {
        //                    alert('Only One First {(} is allowed');
        //                    return false;
        //                }
        //            }
        //        }
        //    }

        //    //End one {(}  number use( biltinnnnn)COde...


        //    //new one {)} BRACATE use( biltinnnnn)COde...


        //    var fieldValue = $(this).val().split('');
        //    var countdecimal = 0;
        //    for (var i = 0; i < fieldValue.length; i++) {
        //        if (fieldValue[i] == ')') {
        //            countdecimal++;
        //            if (countdecimal > 0) {
        //                if (charcode == 8) {
        //                    return true;
        //                }
        //                if (charcode == 41) {
        //                    alert('Only One Colse {)} is allowed');
        //                    return false;
        //                }
        //            }
        //        }
        //    }

        //    //End one {)}  BRACATE use( biltinnnnn)COde...



        //    //new one {-} HIPAN use( biltinnnnn)COde...


        //    var fieldValue = $(this).val().split('');
        //    var countdecimal = 0;
        //    for (var i = 0; i < fieldValue.length; i++) {
        //        if (fieldValue[i] == '-') {
        //            countdecimal++;
        //            if (countdecimal > 0) {
        //                if (charcode == 8) {
        //                    return true;
        //                }
        //                if (charcode == 45) {
        //                    alert('Only One hipan is allowed');
        //                    return false;
        //                }
        //            }
        //        }
        //    }

        //    //End one {-} HIPAN use( biltinnnnn)COde...

        //    if (charcode == 8) {
        //        return true;
        //    }

        //    if (charcode == 43) {
        //        return true;
        //    }
        //    if (charcode == 40) {
        //        return true;
        //    }
        //    if (charcode == 41) {
        //        return true;
        //    }
        //    if (charcode == 45) {
        //        return true;
        //    }

        //    //48 or 57 this means o to 9...

        //    if (charcode < 48 || charcode > 57) {
        //        alert('only numbers are allowed')
        //        return false;
        //    }


        //});


        //Phone end




    });
})(jQuery);
