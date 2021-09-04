--1. Menggunakan LEFT JOIN sehingga seluruh tabel 1 akan dikeluarkan. Jika ada data di tabel 1 yang tidak ada di tabel 2, maka akan muncul NULL di ParentUserName
SELECT a.ID,a.UserName,b.Username as ParentUserName 
FROM `USER` a --tabel 1
LEFT JOIN `USER` b ON b.ID = a.Parent; --tabel 2 