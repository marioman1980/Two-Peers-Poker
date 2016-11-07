/* AJAX call retrieves content for host user */
$('#btn-host-game').click(function(){
	var hostName = $('#user-name').val();
	$('#content').load('host.html', function(){
		$('#host-name').html(hostName);
	});
});
