interface EmailTemplateProps {
	resetLink?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	resetLink,
}) => (
	<div>
		<p>Kami menerima permintaan untuk mengatur ulang kata sandi Anda.</p>
		<p>Klik tautan di bawah ini untuk membuat kata sandi baru:</p>
		{resetLink && (
			<p>
				<a href={resetLink}>Atur Ulang Kata Sandi</a>
			</p>
		)}
		<p>
			Jika Anda tidak meminta pengaturan ulang kata sandi, Anda dapat
			mengabaikan email ini.
		</p>
		<p>Tautan pengaturan ulang kata sandi ini akan kedaluwarsa dalam 1 jam.</p>
		<p>
			Terima kasih,
			<br />
			Tim Kami
		</p>
	</div>
);
