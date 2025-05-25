$(document).ready(function() {
    console.log("Document ready - binding click handler");
    
    $('#send-email-button').on('click', function() {
        console.log("Button clicked");
        
        const formData = {
            event_website: $('#event_uuid').val(),
            full_name: $('#full_name').val(),
            attendance_status: $('#guests').val(),
            phone_number: $('#phone').val()
        };
        
        console.log("Form data:", formData);

        if (!formData.full_name || !formData.attendance_status || !formData.phone_number) {
            alert('Please fill all fields');
            return;
        }
        
        $('#send-email-button').prop('disabled', true).text('Sending...');
        
        $.ajax({
            url: 'https://dashboard.event-crafts.com/api/rsvp.php',
            type: 'POST',
            headers: {
                'X-API-KEY': 'TestSecret1'
            },
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                console.log("Success:", response);
                
                $('#full_name').val('');
                $('#guests').val('');
            },
            error: function(xhr, status, error) {
                console.error("Error:", status, error, xhr.responseText);
                
            },
            complete: function() {
                $('#send-email-button').prop('disabled', false).text('Reserve');
            }
        });
    });
});
