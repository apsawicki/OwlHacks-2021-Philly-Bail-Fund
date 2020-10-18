
let blah;

// Docket, Offenses, Offense Date, Attorney,
let arrayNameContainer = ['index', 'docket_no', 'offenses', 'offense_date', 'arrest_dt', 'case_status',
    'arresting_officer', 'attorney', 'dob', 'zip', 'bail_set_by', 'bail_amount', 'bail_paid', 'bail_date',
    'bail_type', 'prelim_hearing_dt', 'prelim_hearing_time', 'parsed_offenses']
let actualArrays = new Array(arrayNameContainer.length);

function importCsvAndSet() {
    $.ajax({
        async: false,
        type: 'GET',
        url: 'csv/parsed1.csv',
        success: function (responseText) {
            var data = $.csv2Array(responseText);
            blah = data;

            /*
             * Turns actualArrays into an array of arrays to be used in the format of:
             * 		actualArrays[indexOfDesiredBondCase][indexOfDesiredNameContainer]
             */
            for (let i = 0; i < arrayNameContainer.length; i++)
                actualArrays[i] = new Array((data.length));

            for (let i = 0; i < arrayNameContainer.length; i++)
                for (let j = 0; j < data.length; j++)
                    actualArrays[i][j] = data[j][i];
        }
    });
}

function displayFormattedCsv() {
    let standardOrder = [1, 17, /* 3, */ 4, 5, 6, 7, /* 8, */ 9, 10, 11, 12, 13, 14, 15]
    let outputText = ""
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    for (let i = 1; i < blah.length; i++) { // Loop through every title element
        outputText += "<tr>"

        for (let j = 0; j < standardOrder.length; j++)
            switch (standardOrder[j]) {
                case 11:
                case 12: {
                    outputText += "<td>" + formatter.format(parseFloat(actualArrays[standardOrder[j]][i])) + "</td>"
                    break;
                }
                case 15: {
                    outputText += "<td>" + actualArrays[standardOrder[j]][i] + ",<br/> "
                        + actualArrays[standardOrder[j] + 1][i] + "</td>"
                    break;
                }
                case 17: {
                    outputText += "<td>" + actualArrays[standardOrder[j]][i].replace(/[\[\]']+/g, "") + "</td>"
                    break;
                }
                default:
                    outputText += "<td>" + actualArrays[standardOrder[j]][i] + "</td>"
                    break;
            }

        outputText += "</tr>"
    }

    $('#input_table').append(outputText)

    $(document).ready(function () {
        $('#dtBasicExample').DataTable();
        $('#dtBasicExample').add();
        $('.dataTables_length').addClass('bs-select');
    });
}