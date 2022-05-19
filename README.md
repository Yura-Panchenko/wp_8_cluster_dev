<!-- cluster_8_dev -->
# Начало разработки
Чтобы начать разработку, надо сделать клон в папку проекта используя команду
```
git clone https://github.com/Yura-Panchenko/cluster_8_dev.git
```
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/20921546.jpg" alt="image description" width="843">
или скачать архив
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/19781421.jpg" alt="image description" width="1005">

## Лишнее удалить!!!
После завершения скачивания
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/21935906.jpg" alt="image description" width="580">
у Вас должны появиться такие папки и файлы
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/21359421.jpg" alt="image description" width="685">
Оставляем нужную нам папку, все остальное удаляем

## Преходим внутрь папки где лежат gulp файлы
## Устанавливаем сборщик
для запуска нашего проекта надо установить наши модули
```
$ npm install
```
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/22180109.jpg" alt="image description" width="561">

## Для проекта с BOOTSTRAP
дополнительно устанавливаем bootstrap (если bootstrap нету - пропускаем этот шаг)
```
$ npm install bootstrap
```
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/22288593.jpg" alt="image description" width="587">

## Запускаем проект в разработку
Для старта нашего проекта запускаем команду - $ gulp
```
$ gulp
```
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/22671968.jpg" alt="image description" width="594">

## Продолжение проекта
для последующей работы мы запускаем только команду
```
$ gulp
```

## Перед постановкой на QA или перед отправкой клиенту нам надо почистить код и ужать картинки, для этого запускаем команду

```
$ gulp dist
```
<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/23037218.jpg" alt="image description" width="594" height="62">

# Как работать с папками и файлами?
* Всю разработку проводим в папке dev !!!
	<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/23416718.jpg" alt="image description" width="604" height="234">
* в папку assets вкладываем (все то что не требует компиляции)
	- картинки
	- шрифты
	- inc
* в папку js складываем js
* в папку pug складываем:
	- темплейты
	- mixins
	- head
	- header
	- footer
* в папку scss соответственно scss

# PUG
****
* для добавленя класса на боди на нудной нам странице, добавляем переменную на страницу с нужным нам классом
	<img src="https://github.com/Yura-Panchenko/cluster_8_dev/blob/master/images/14i0336x21my885o31.jpg" alt="image description" width="893">
