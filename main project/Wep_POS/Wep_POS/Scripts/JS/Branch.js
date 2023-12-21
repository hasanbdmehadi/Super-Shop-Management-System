//--------------------------ClearAll-------------------------------
function ClearAll() {
    $('#BranchSlNo').val("");
    $('#BranchName').val("");
    $('#Company_SlNo').val("");
    $('#BankSlNo').val("");
    
    $('#Address').val("");
    $('#Phone').val("");
    $('#Mobile').val("");
    $('#Email').val("");
    $('#Note').val("");
    
   
    

}
//---------------------------------ClearAll--------------------------------


//---------------------------------DeleteBranch-------------------------------
function DeleteBranch(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteBranch',
            type: 'POST',
            data: { BranchSlNo: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#Branch").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}
//---------------------------------End DeleteBranch---------------------------
//---------------------------------Edit---------------------------------------
function UpdateBranch(rowId) {
    $.ajax({
        url: 'GetBranchById',
        type: 'POST',
        data: { BranchSlNo: rowId },
        success: function (data) {
            $('#BranchSlNo').val(data.BranchSlNo);
            $('#BranchName').val(data.BranchName);
            $('#BankSlNo').val(data.BankSlNo);
            $('#Company_SlNo').val(data.Company_SlNo);
            $('#Address').val(data.Address);
            $('#Phone').val(data.Phone);
            $('#Mobile').val(data.Mobile);
            $('#Email').val(data.Email);
            $('#Note').val(data.Note);
           // $('#Creator').val(data.Creator);
          //  $('#CreationDate').val(data.CreationDate);
           // $('#Modifier').val(data.Modifier);
          //  $('#ModificationDate').val(data.ModificationDate);
           
        }
    });
}

//---------------------------------End Edit-----------------------------------
(function ($) {
    $(document).ready(function () {
        
        //-------------------Save------------------------
        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {

          

                    $.ajax({
                        url: 'AddBranch',
                        type: 'POST',

                        data: JSON.stringify({
                            alert: ('Saving'),
                            aBranch: {

                                Branch_SlNo: $('#BranchSlNo').val(),
                                Company_SlNo: $('#Company_SlNo').val(),
                                BankSlNo: $('#BankSlNo').val(),
                                BranchName: $('#BranchName').val(),
                                Address: $('#Address').val(),
                                Phone: $('#Phone').val(),
                                Mobile: $('#Mobile').val(),
                                eMail: $('#eMail').val(),
                                Note: $('#Note').val(),
                                Status: $('#Status').val(),
                                Creator: $('#Creator').val(),
                                Modifier: $('#Modifier').val(),
                                ModificationDate: $('#ModificationDate').val(),
                                CreationDate: $('#CreationDate').val()

                            }
                        }),

                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            $("#Branch").trigger("reloadGrid");
                            alert('Data Save Successfully');
                            ClearAll();

                        }
                    });
                }
            
        });

        //--------------------------------End Save-----------------------------------

        //-------------------------------Update--------------------------------------
        $('#btnUpdate').click(function () {
           
            var retval = insert_update();
            if (retval == true) {

              


                    $.ajax({

                        url: 'UpdateBranch',
                        type: 'POST',

                        data: JSON.stringify({

                            aBranch: {
                                BranchSlNo: $('#BranchSlNo').val(),
                                BranchName: $('#BranchName').val(),
                                Company_SlNo: $('#Company_SlNo').val(),

                                BankSlNo: $('#BankSlNo').val(),

                                Address: $('#Address').val(),
                                Phone: $('#Phone').val(),
                                Mobile: $('#Mobile').val(),
                                eMail: $('#Email').val(),
                                Note: $('#Note').val(),
                                Status: $('#Status').val(),
                                Creator: $('#Creator').val(),
                                Modifier: $('#Modifier').val(),
                                ModificationDate: $('#ModificationDate').val(),
                                CreationDate: $('#CreationDate').val()

                            }
                        }),

                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            $("#Branch").trigger("reloadGrid");
                            alert('Data Updated Successfully');
                            ClearAll();

                        }
                    });
                }
            
        });
        //-------------------------------End Update----------------------------------
        //-------------------------------Start Grid------------------------------------

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#Branch").setGridWidth(900);
            }
            else {
                $("#Branch").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#Branch").jqGrid({
            url: 'BranchDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'BranchSlNo',
                name: 'BranchSlNo',
                index: 'BranchSlNo',
                width: 120,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Branch Name',
                name: 'BranchName',
                index: 'BranchName',
                width: 130,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 100,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Company Sl No',
                name: 'Company_SlNo',
                index: 'Company_SlNo',
                width: 140,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Bank Sl No',
                name: 'BankSlNo',
                index: 'BankSlNo',
                width: 130,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Phone',
                name: 'Phone',
                index: 'Phone',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden: true
            }
            ,
            {
                label: 'Mobile',
                name: 'Mobile',
                index: 'Mobile',
                width: 100,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Email',
                name: 'eMail',
                index: 'eMail',
                width: 80,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 80,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                label: 'Creator',
                name: 'Creator',
                index: 'Creator',
                width: 300,
                editable: true,
                edittype: 'text',
                hidden: true,
            }

            ,
            {
                label: 'CreationDate',
                name: 'CreationDate',
                index: 'CreationDate',
                width: 300,
                editable: true,
                edittype: 'text',
                hidden: true,
            }
            ,
            {
                label: 'Modifier',
                name: 'Modifier',
                index: 'Modifier',
                width: 300,
                editable: true,
                edittype: 'text',
                hidden: true,
            }
            ,
            {
                label: 'ModificationDate',
                name: 'ModificationDate',
                index: 'ModificationDate',
                width: 300,
                editable: true,
                edittype: 'text',
                hidden: true,
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 60, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 80, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#Branch").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#Branch').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateBranch(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#Branch").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteBranch(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#Branch").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#BranchPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BranchSlNo",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Branch',
            editurl: 'UpdateBranch',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#Branch").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#Branch").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#Branch').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#Branch').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#Branch').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#Branch").jqGrid('navGrid', '#BranchPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/UpdateBranch',
            closeAfterEdit: true
        }, {
            url: '/Setup/AddBranch',
            closeAfterAdd: true
        }, {
            url: '/Setup/DeleteBranch',
            closeAfterDelete: true
        }, {});

        //End jQGrid
        //------------------------------------  End  Gried ------------------------------------------

        //----------------------------------------Start Validation-----------------------------------


        $('#Branch Name').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Company Serial No').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Address').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Mobile').bind('keypress', function (evt) {
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





            if ($('#BranchName').val() == '') {
                $('#BranchName').focus();
                return false;
            }
            if ($('#Company_SlNo').val() == '') {
                $('#Company_SlNo').focus();
                return false;
            }
            if ($('#Address').val() == '') {
                $('#Address').focus();
                return false;
            }
            if ($('#Mobile').val() == '') {
                $('#Mobile').focus();
                return false;
            }
            
           

            return true;
        }



        //check charcode for ProductCategory_Name

        $('#BranchName').bind('keypress', function (evt) {
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



        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
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

        //end charcode for Note
        //check charcode for Branch Name

        $('#BranchName').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 80) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 80');
                    return false;
                }
            }
        });

        //end charcode for Branch Name
        //check charcode for Address

        $('#Address').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 120) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 120');
                    return false;
                }
            }
        });

        //end charcode for Address










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

        $('#Email').blur(function () {

            var sEmail = $('#Email').val();
            if ($.trim(sEmail).length == 0) {
                alert('Please enter valid email address');
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#Email').html('Email is valid');
                $('#Email').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#Email').html('Invalid Email Address');
                $('#Email').css('color', 'red');
                e.preventDefault();
                return false;
            }
        });

        //---------------------End of Email Address Validation------------------------------------



        //----------------------------------------End Validation-------------------------------------


    });
})(jQuery);