




//-----------------------ClearAll--------------------------------
function ClearAll() {
    $('#PaymentTypeSlNo').val("");
    $('#PaymentTypeName').val("");
   

}
//--------------------------End ClearAll------------------------------------


//-----------------------------------   Delete  -----------------------------

function DeletePaymentType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeletePaymentType',
            type: 'POST',
            data: { PaymentTypeSlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#PaymentType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//-----------------------------------------   End delete ----------------------------------


//-------------------------------------    Edit -----------------------------

function EditPaymentType(rowId) {
    $.ajax({
        url: 'GetPaymentTypeById',
        type: 'POST',
        data: { PaymentTypeSlNo: rowId },
        success: function (data) {
            $('#PaymentTypeSlNo').val(data.PaymentTypeSlNo);
            $('#PaymentTypeName').val(data.PaymentTypeName);
            //$('#Creator').val(data.Creator);
            //$('#Modifier').val(data.Modifier);

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
                    url: 'AddPaymentType',
                    type: 'POST',

                    data: JSON.stringify({

                        aPaymentType: {

                            PaymentTypeSlNo: $('#PaymentTypeSlNo').val(),
                            PaymentTypeName: $('#PaymentTypeName').val(),
                            Creator: $('#Creator').val(),
                            CreationDate: $('#CreationDate').val(),
                            Modifier: $('#Modifier').val(),
                            ModificationDate: $('#ModificationDate').val(),

                            Status: "A"
                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#PaymentType").trigger("reloadGrid");
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
                        url: ' UpdatePaymentType',
                        type: 'POST',

                        data: JSON.stringify({

                            aPaymentType: {

                                PaymentTypeSlNo: $('#PaymentTypeSlNo').val(),
                                PaymentTypeName: $('#PaymentTypeName').val()
                       
                            }
                        }),

                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            $("#PaymentType").trigger("reloadGrid");
                            alert('Data Updated Successfully');
                            ClearAll();

                        }
                    });
                });

                //        ---------------------------------------End Update---------------------------------


                //------------------------------------   Start Gried ----------------------------------------



                $(window).bind('resize', function () {
                    var vWidth = $(window).width();
                    if (vWidth > 1000) {
                        $("#PaymentType").setGridWidth(900);
                    }
                    else {
                        $("#PaymentType").setGridWidth($(window).width());
                    }
                }).trigger('resize');



                //jQGrid

                var AdminFunctionsLastSel = 1;
                //setup function table
                $("#PaymentType").jqGrid({
                    url: 'PaymentTypeDetails',
                    datatype: 'json',
                    mtype: 'GET',
                    width: 'auto',
                    height: 'auto',
                    colModel: [{
                        label: 'PaymentTypeSlNo',
                        name: 'PaymentTypeSlNo',
                        index: 'PaymentTypeSlNo',
                        width: 120,
                        editable: true,
                        edittype: 'text',
                        hidden: true
                    }, {
                        label: 'Payment Type Name',
                        name: 'PaymentTypeName',
                        index: 'PaymentTypeName',
                        width: 600,
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
                        var ids = $("#PaymentType").jqGrid('getDataIDs');
                        //   loop through all rows in the table and set required column data

                        for (var i = 0; i < ids.length; i++) {
                            var rowdata = $('#PaymentType').jqGrid('getRowData', ids[i]);
                            var cl = ids[i];

                            s = "<div title='edit' onclick='EditPaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                            $("#PaymentType").setRowData(ids[i], { Edit: s });

                            s = "<div title='delete' onclick='DeletePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                            $("#PaymentType").setRowData(ids[i], { Delete: s });
                        }
                    },

                    pager: $('#PaymentTypePager'),
                    rowNum: 18,
                    rowList: [10, 20, 30],
                    sortname: "PaymentTypeSlNo",
                    sortorder: "desc",
                    viewrecords: true,
                    imgpath: '/Content/custom-theme/images',
                    caption: 'Payment Type',
                    editurl: 'UpdatePaymentType',
                    loadError: function (xhr, st, err) { },
                    loadComplete: function ()
                        //--Relode gride--//
                    { $("#PaymentType").trigger("reloadGrid"); },
                    //------Relode gride end---------//
                    onCellSelect: function (rowID, iCol, cellContent) {
                        if (rowID && (rowID !== AdminFunctionsLastSel)) {
                            //----------Relode grid--------//
                            $("#PaymentType").trigger("reloadGrid");
                            //......Relode gride  End...........//
                            //disable edit row on last selection
                            $('#PaymentType').editRow(AdminFunctionsLastSel, false);
                            //save the last row selected
                            if (AdminFunctionsLastSel != 0) $('#PaymentType').saveRow(AdminFunctionsLastSel, false);
                            //enable row edit on current row
                            $('#PaymentType').editRow(rowID, true);
                            AdminFunctionsLastSel = rowID;
                        }
                    }
                });

                $("#PaymentType").jqGrid('navGrid', '#PaymentTypePager', {
                    search: false,
                    edit: false,
                    add: false,
                    del: false
                }, {
                    url: '/Setup/UpdatePaymentType',
                    closeAfterEdit: true
                }, {
                    url: '/Setup/AddPaymentType',
                    closeAfterAdd: true
                }, {
                    url: '/Setup/DeletePaymentType',
                    closeAfterDelete: true
                }, {});

                //End jQGrid
                //------------------------------------  End  Gried ------------------------------------------
                //--------------------------------------Start Validation-----------------------------------


                $('#PaymentTypeName').bind('keypress', function (evt) {
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




                    if ($('#PaymentTypeName').val() == '') {
                        $('#PaymentTypeName').focus();
                        return false;
                    }
           

                    return true;
                }



                //check charcode for PaymentTypeName

                $('#PaymentTypeName').bind('keypress', function (evt) {
                    var charcode = (evt.which);
                    if ($(this).val().length > 50) {
                        if (charcode == 8) {
                            return true;
                        }
                        else {
                            alert('Max length is =50');
                            return false;
                        }
                    }
                });

                //end check charcode for PaymentTypeName


       












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

                //---------------------End Validation-------------------------
            });
        })(jQuery);
 