# -*- coding=UTF-8 -*-

import codecs
import re
import json


def _do_open_bible():
	file = codecs.open('./biblia-em-txt.txt', encoding='UTF-8')
	text = file.read()
	file.close()
	return text.replace('\r', '')


def _do_compile():
	text = _do_open_bible()
	lines = text.split('\n')

	data = {'testments': []}
	books = []

	for l in lines:

		# Testament
		if re.match(r'^#\s', l):
			# print 'Found testment: %s' % l
			testment = {
				'title': re.match(r'^#\s(.*?)$', l).groups()[0],
				'books': []
			}
			data['testments'].append(testment)

		# Book
		elif re.match(r'^[^\s\dl]', l):
			# print 'Found book: %s' % l
			book = {
				'title': re.match(r'^(.*?)$', l).groups()[0],
				'chapters': []
			
			}
			testment['books'].append(book)

		elif re.match(r'^\s(.*?)\d+', l):
			# print 'Found chapter: %s' % l
			chapter = {
				'index': re.match(r'^\s.*?(\d+)', l).groups()[0].replace('l', '1'),
				'title': re.match(r'^\s(.*?)\s*\d+', l).groups()[0],
				'versicles': []
			
			}
			book['chapters'].append(chapter)
		
		elif re.match(r'^l?\d+', l):
			# print 'Found versicle: %s' % l
			versicle = {
				'index': re.match(r'^(l?\d+)', l).groups()[0].replace('l', '1'),
				'title': re.match(r'^(l?\d+)\s(.*)', l).groups()[1],
			
			}
			chapter['versicles'].append(versicle)

		else:
			print 'Oops. Something went wrong: [%s]' % l

	file = codecs.open('./bible.json', 'w', encoding='UTF-8')
	file.write(json.dumps(data, ensure_ascii=False, indent=None))
	file.close()

_do_compile()
