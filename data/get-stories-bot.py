# -*- coding: UTF-8 -*-

import hashlib
import json
import urllib
import urllib2
import time
import re
import codecs
import subprocess

from bs4 import BeautifulSoup

DEF_MAX_RENTRIES = 5


def _pathify(path):
    hash_object = hashlib.md5(path.encode('utf-8'))
    return hash_object.hexdigest()



def _decode(cfemail):
    enc = bytearray.fromhex(cfemail)
    return bytearray([c ^ enc[0] for c in enc[1:]]).decode('utf8')


def _deobfuscate_cf_email(soup):
    for encrypted_email in soup.select('.__cf_email__'):
        decrypted = _decode(encrypted_email['data-cfemail'])
        encrypted_email.replace_with(decrypted)


def _get_page(url):
    page = BeautifulSoup("", "lxml")

    for i in range(DEF_MAX_RENTRIES):
        try:
            req = urllib2.Request(url, headers={'User-Agent': "Magic Browser"})
            html = urllib2.urlopen(req).read()
            page = BeautifulSoup(html, "lxml")
            break
        except Exception as e:
            print "Can't get page", url, "... trying again in 5 sec (" + str(i) + ")", e
            time.sleep(5)

    _deobfuscate_cf_email(page)

    return page


def _get_stories():
    _stories = []
    _root_bs = _get_page('https://historiasdabiblia.com.br/')
    _stories_bs = _root_bs.select('.story')

    for _story in _stories_bs:
        _s = {
            'title': _story.select('.story-link')[0].text,
            'index': _story.select('.account-link')[0].text,
            'data': []
        }

        _inner_url = str('https://historiasdabiblia.com.br/') + str(urllib.quote(
            _story.select('.account-link')[0].get('href').encode('UTF-8')
        ))

        print _inner_url
        
        _inner_story_bs = _get_page(_inner_url)
        _data_bs = _inner_story_bs.select('.story .text p')
        _data = []

        for _d in _data_bs:
            map(lambda x: x.extract(), _d.select('sup'))
            _data.append(_d.text)

        _s['data'] = _data
        _stories.append(_s)


    _file = codecs.open('stories.json', 'w', encoding='UTF-8')
    _file.write(json.dumps(_stories, ensure_ascii=False, indent=4))
    _file.close()


def _get_par():
    _stories = []
    _root_bs = _get_page('https://www.bibliaon.com/parabolas/')
    _stories_bs = _root_bs.select('.lista.border-box li a')

    for _story in _stories_bs:
        _s = {
            'title': _story.text,
            'index': '',
            'data': []
        }

        _inner_url = str('https://www.bibliaon.com') + str(urllib.quote(
            _story.get('href').encode('UTF-8')
        ))

        print _inner_url
        
        _inner_story_bs = _get_page(_inner_url)
        _data_bs = _inner_story_bs.select('.destaque.color-box p')
        _data = []

        for _d in _data_bs:
            _data.append(_d.text)

        _s['data'] = _data
        _stories.append(_s)


    _file = codecs.open('parables.json', 'w', encoding='UTF-8')
    _file.write(json.dumps(_stories, ensure_ascii=False, indent=4))
    _file.close()


_get_par()