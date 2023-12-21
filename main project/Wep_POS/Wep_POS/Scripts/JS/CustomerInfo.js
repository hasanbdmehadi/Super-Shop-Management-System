
//-----------------------ClearAll--------------------------------
function ClearAll() {
    $('#CustomerSlNo').val("");
    $('#CustomerCode').val("");
    $('#CustomerName').val("");
    $('#CustomerType').val("");
    $('#Propietor').val("");
    $('#ContactPerson').val("");
    $('#Address').val("");
    $('#Phone').val("");
    $('#Mobile').val("");
    $('#eMail').val("");
    $('#VATRegNo').val("");
    $('#DiscountPercent').val("");
    $('#DistributorPoint').val("");


}
//--------------------------End ClearAll------------------------------------


//-----------------------------------   Delete  -----------------------------

function DeleteCustomerInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteCustomerInfo',
            type: 'POST',
            data: { CustomerSlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                // $("#CustomerInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//-----------------------------------------   End delete ----------------------------------
//-------------------------------------    Edit -----------------------------

function UpdateCustomerInfo(rowId) {
    $.ajax({
        url: 'GetCustomerInfoById',
        type: 'POST',
       
        data: { CustomerSlNo: rowId },
        success: function (data) {
           
            $('#CustomerSlNo').val(data.CustomerSlNo)
            $('#CustomerCode').val(data.CustomerCode),
            $('#CustomerName').val(data.CustomerName),
            $('#CustomerType').val(data.CustomerType),
          
            $('#Propietor').val(data.Propietor),
            $('#ContactPerson').val(data.ContactPerson),
            $('#Address').val(data.Address),
            $('#Phone').val(data.Phone),
            $('#Mobile').val(data.Mobile),
            $('#eMail').val(data.eMail),
            $('#VATRegNo').val(data.VATRegNo),
            $('#DiscountPercent').val(data.DiscountPercent),
            $('#DistributorPoint').val(data.DistributorPoint)
            

        }
    });
}

//------------------------------   End Edit  ------------------------------------------

(function ($) {
    $(document).ready(function () {
        
        //-------------------Save------------------------
        $('#btnSave').click(function () {
        
            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: 'AddCustomerInfo',
                    type: 'POST',

                    data: JSON.stringify({

                        aCustomerInfo: {

                            CustomerSlNo: $('#CustomerSlNo').val(),
                            CustomerCode: $('#CustomerCode').val(),
                            CustomerName: $('#CustomerName').val(),
                            CustomerType: $('#CustomerType').val(),
                            Propietor: $('#Propietor').val(),
                            ContactPerson: $('#ContactPerson').val(),
                            Address: $('#Address').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            eMail: $('#eMail').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            DiscountPercent: $('#DiscountPercent').val(),
                            DistributorPoint: $('#DistributorPoint').val(),
                            Status: $('#Status').val(),
                            Creator: $('#Creator').val(),
                            CreationDate: $('#CreationDate').val(),
                            Modifier: $('#Modifier').val(),
                            ModificationDate: $('#ModificationDate').val(),
                            Status: "True"




                        }
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#CustomerInfo").trigger("reloadGrid");
                        alert('Data Save Successfully');
                        ClearAll();

                    }
                });
            }
        });

        //--------------------------------End Save-----------------------------------
        //----------------------------------  Update  ---------------------------------------------



        $('#btnUpdate').click(function () {

            $.ajax({
                url: 'UpdateCustomerInfo',
                type: 'POST',
                data: JSON.stringify({
                    aCustomerInfo: {
                        CustomerSlNo: $('#CustomerSlNo').val(),
                        CustomerCode: $('#CustomerCode').val(),
                        CustomerName: $('#CustomerName').val(),
                        CustomerType: $('#CustomerType').val(),
                        Propietor: $('#Propietor').val(),
                        ContactPerson: $('#ContactPerson').val(),
                        Address: $('#Address').val(),
                        Phone: $('#Phone').val(),
                        Mobile: $('#Mobile').val(),
                        eMail: $('#eMail').val(),
                        VATRegNo: $('#VATRegNo').val(),
                        DiscountPercent: $('#DiscountPercent').val(),
                        DistributorPoint: $('#DistributorPoint').val(),
                        Status: $('#Status').val(),
                        Creator: $('#Creator').val(),
                        CreationDate: $('#CreationDate').val(),
                        Modifier: $('#Modifier').val(),
                        ModificationDate: $('#ModificationDate').val()

                    }
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                 $("#CustomerInfo").trigger("reloadGrid");
                    alert('Data Updated Successfully');
                    ClearAll();
                }
            });
        });

        //-----------------------------------   End Update-------------------------------------------

        //------------------------------------   Start Gried ----------------------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#CustomerInfo").setGridWidth(900);
            }
            else {
                $("#CustomerInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#CustomerInfo").jqGrid({
            url: 'CustomerInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'CustomerSlNo',
                name: 'CustomerSlNo',
                index: 'CustomerSlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Customer Code',
                name: 'CustomerCode',
                index: 'CustomerCode',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Customer Name',
                name: 'CustomerName',
                index: 'CustomerName',
                width: 120,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Customer Type',
                name: 'CustomerType',
                index: 'CustomerType',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Propietor',
                name: 'Propietor',
                index: 'Propietor',
                width: 70,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Contact Person',
                name: 'ContactPerson',
                index: 'ContactPerson',
                width: 110,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 120,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Phone',
                name: 'Phone',
                index: 'Phone',
                width: 60,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Mobile',
                name: 'Mobile',
                index: 'Mobile',
                width: 120,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Email',
                name: 'eMail',
                index: 'eMail',
                width: 120,
                editable: true,
                edittype: 'text'
            }, {
                label: 'VAT Reg. No',
                name: 'VATRegNo',
                index: 'VATRegNo',
                width: 40,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Discount Percent',
                name: 'DiscountPercent',
                index: 'DiscountPercent',
                width: 40,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Distributor Point',
                name: 'DistributorPoint',
                index: 'DistributorPoint',
                width: 60,
                editable: true,
                edittype: 'text',
                hidden: true
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 35, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width:45, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#CustomerInfo").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#CustomerInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateCustomerInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#CustomerInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteCustomerInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#CustomerInfo").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#CustomerInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "CustomerSlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'CustomerInfo',
            editurl: 'UpdateCustomerInfo',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#CustomerInfo").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#CustomerInfo").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#CustomerInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#CustomerInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#CustomerInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#CustomerInfo").jqGrid('navGrid', '#CustomerInfoPager', {
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
        //--------------------------------------Start Validation-----------------------------------


        $('#CustomerCode').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#CustomerName').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#CustomerType').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#ContactPerson').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Phone').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#VATRegNo').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#DistributorPoint').bind('keypress', function (evt) {
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




            if ($('#CustomerCode').val() == '') {
                $('#CustomerCode').focus();
                return false;
            }
            if ($('#CustomerName').val() == '') {
                $('#CustomerName').focus();
                return false;
            }

            if ($('#CustomerType').val() == '') {
                $('#CustomerType').focus();
                return false;
            }

            if ($('#ContactPerson').val() == '') {
                $('#ContactPerson').focus();
                return false;
            }

            if ($('#Phone').val() == '') {
                $('#Phone').focus();
                return false;
            }
            if ($('#DistributorPoint').val() == '') {
                $('#DistributorPoint').focus();
                return false;
            }
            if ($('#VATRegNo').val() == '') {
                $('#VATRegNo').focus();
                return false;
            }
           
            return true;
        }



        //check charcode for Customer Code

        $('#CustomerCode').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if (charcode == 8) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }
            
            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 15');
                    return false;
                }
            }
        });

        //end check charcode for Company_Name
        $('#CustomerName').bind('keypress', function (evt) {
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
        $('#CustomerType').bind('keypress', function (evt) {
            var charcode = (evt.which);
            
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
               
                else{
                  
                    alert('Max length is = 50');
                    return false;
                }
            }
        });
        $('#Propietor').bind('keypress', function (evt) {
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
        $('#ContactPerson').bind('keypress', function (evt) {
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
        $('#Address').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 100) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 100');
                    return false;
                }
            }
        });
       
       
        $('#eMail').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 50');
                    return false;
                }
            }
        });
        $('#VATRegNo').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if (charcode == 8) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
               
                else {
                    
                    alert('Max length is = 50');
                    return false;
                    

                }
            }
        });
        $('#DiscountPercent').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if (charcode == 8) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 50');
                    return false;
                }
                
            }
        });
        $('#DistributorPoint').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 50');
                    return false;
                }
            }
        });

       

        //Charcode validation for phone 

        $('#Phone').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
                    return false;
                }
            }

            //new one (+) COde...

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '+') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 43) {
                            alert('Only One + point is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {+} number use( biltinnnnn)COde...

            //new one {(} number use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '(') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 40) {
                            alert('Only One First {(} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {(}  number use( biltinnnnn)COde...


            //new one {)} BRACATE use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == ')') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 41) {
                            alert('Only One Colse {)} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {)}  BRACATE use( biltinnnnn)COde...



            //new one {-} HIPAN use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '-') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 45) {
                            alert('Only One hipan is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {-} HIPAN use( biltinnnnn)COde...

            if (charcode == 8) {
                return true;
            }

            if (charcode == 43) {
                return true;
            }
            if (charcode == 40) {
                return true;
            }
            if (charcode == 41) {
                return true;
            }
            if (charcode == 45) {
                return true;
            }

            //48 or 57 this means o to 9...

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }


        });


        //Phone end

        //Charcode validation for Mobile 
        $('#Mobile').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
                    return false;
                }
            }

            //new one (+) COde...

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '+') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 43) {
                            alert('Only One + point is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {+} number use( biltinnnnn)COde...

            //new one {(} number use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '(') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 40) {
                            alert('Only One First {(} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {(}  number use( biltinnnnn)COde...


            //new one {)} BRACATE use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == ')') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 41) {
                            alert('Only One Colse {)} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {)}  BRACATE use( biltinnnnn)COde...



            //new one {-} HIPAN use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '-') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 45) {
                            alert('Only One hipan is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {-} HIPAN use( biltinnnnn)COde...

            if (charcode == 8) {
                return true;
            }

            if (charcode == 43) {
                return true;
            }
            if (charcode == 40) {
                return true;
            }
            if (charcode == 41) {
                return true;
            }
            if (charcode == 45) {
                return true;
            }

            //48 or 57 this means o to 9...

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }


        });


        //Mobile end

        //-------------------------Email Address Validation----------------------------------------

        function validateEmail(sEmail) {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(sEmail)) {
                return true;
            }
            else {
                return false;
            }
        }

        $('#eMail').blur(function () {

            var sEmail = $('#eMail').val();
            if ($.trim(sEmail).length == 0) {
                alert('Please enter valid email address');
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#eMail').html('Email is valid');
                $('#eMail').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#eMail').html('Invalid Email Address');
                $('#eMail').css('color', 'red');
                e.preventDefault();
                return false;
            }
        });

        //---------------------End of Email Address Validation------------------------------------





        //----------------------------------------End Validation-------------------------------------

    });
})(jQuery);
