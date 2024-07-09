export const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number)
}

export const formatKategoryCars = (size) => {
    if (size === 'small') {
        return '2-4 People'
    }
    if (size === 'medium') {
        return '4-6 People'
    }
    if (size === 'large') {
        return '6-8 People'
    }else {
        return '-'
    }
}

export const formatDateIndo = (date) => {
    return new Date(date).toLocaleDateString('id-ID')
}

export const formatTanggalIndo = (tanggalStr) => {
    const bulanIndo = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Parse string ISO 8601 menjadi objek Date
    const tanggal = new Date(tanggalStr);

    // Validasi apakah tanggal valid
    if (isNaN(tanggal)) {
        throw new Error("Input harus berupa string tanggal yang valid dalam format ISO 8601");
    }

    const hari = tanggal.getDate();
    const bulan = bulanIndo[tanggal.getMonth()];
    const tahun = tanggal.getFullYear();
    const jam = tanggal.getHours();
    const menit = tanggal.getMinutes();

    return `${hari} ${bulan} ${tahun}, ${jam}:${menit.toString().padStart(2, '0')}`;
}